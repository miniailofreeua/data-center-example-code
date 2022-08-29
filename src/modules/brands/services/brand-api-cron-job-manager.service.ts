import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { In } from 'typeorm';
import axios from 'axios';
import { CronJob } from 'cron';

import { TraderEntity } from 'src/modules/traders/traders.entity';
import { TradersToBrandsRepository } from 'src/modules/tradersToBrands/tradersToBrands.repository';

import { BrandEntity } from '../brands.entity';
import { BrandsRepository } from '../brands.repository';
import { formApiUrl } from '../helpers/formApiUrl.helper';
import { mapUpdateCrmResponse } from '../mappers/mapUpdateCrmResponse.mapper';
import { concatUrl } from 'src/infrastructure/helpers/concatUrl.helper';
import { BrandUpdateApiEntity } from '../modules/brandUpdateApis/brandUpdateApis.entity';
import { getCronJobNameForBrand } from '../helpers/getUpdateCronJobNameForBrand.helper';
import { handleApiError } from '../helpers/handleApiError.helper';
import { filterValidBrandApi } from '../helpers/filterValidBrandApi.helper';
import { TradersRepository } from 'src/modules/traders/traders.repository';

export type queryBrand = {
  name: string;
};

const startNewCronJob = (api, func) => {
  const cronName = getCronJobNameForBrand(api);

  const job = new CronJob(`${api.runEverySeconds} * * * * *`, func);

  new SchedulerRegistry().addCronJob(cronName, job);
  job.start();
  console.log('Job was created', cronName);
};

@Injectable()
export class BrandApiCronJobMangerService {
  constructor() {}

  public async updateTradersByCrmIdBulk(
    crmTraders,
    brandId: number,
  ): Promise<TraderEntity[]> {
    if (crmTraders.length === 0) {
      return null;
    }
    const crmTraderIds = crmTraders.map((trader) => trader.crmTraderId);
    const findByCrmIdAndBrandOption = {
      crmTraderId: In(crmTraderIds),
      brandId,
    };
    const dbTraderToBrands = await TradersToBrandsRepository.findStatic({
      where: findByCrmIdAndBrandOption,
      relations: ['trader'],
    });
    if (dbTraderToBrands.length === 0) {
      return null;
    }
    const traderToBrandsToUpdate = dbTraderToBrands.reduce(
      (acc, traderToBrand) => {
        const crmTraderData = crmTraders.find(
          (crmTrader) => crmTrader.crmTraderId === traderToBrand.crmTraderId,
        );
        if (!crmTraderData) {
          return acc;
        }
        const mappedTraderToBrand = { ...traderToBrand, ...crmTraderData };
        return [...acc, mappedTraderToBrand];
      },
      [],
    );

    return TradersToBrandsRepository.bulkCreateOrUpdateStatic(
      traderToBrandsToUpdate,
    );
  }

  public async createNewTradersBulk(
    crmTraders,
    brandId: number,
  ): Promise<TraderEntity[]> {
    if (crmTraders.length === 0) {
      return null;
    }
    const crmTraderIds = crmTraders.map((trader) => trader.crmTraderId);
    const findByCrmIdAndBrandOption = {
      crmTraderId: In(crmTraderIds),
      brandId,
    };
    const dbTraderToBrands = await TradersToBrandsRepository.findStatic({
      where: findByCrmIdAndBrandOption,
      relations: ['trader'],
    });

    const newCrmTraders = crmTraders.filter((crmTrader) => {
      const isAlreadyExist = dbTraderToBrands.some(
        (traderToBrand) => traderToBrand.crmTraderId === crmTrader.crmTraderId,
      );
      return !isAlreadyExist;
    });

    const tradersToCreate = newCrmTraders.map((trader) => {
      // required fields to create trader
      const { firstName, lastName, email, phone, crmTraderId } = trader;
      //  trader is dynamic instance. It maps based on Admin input in keyToColumnMappings params
      const traderPayload = {
        ...trader,
        firstName,
        lastName,

        traderCredential: {
          ...trader,
          email,
          phone,
        },

        traderBrand: {
          ...trader,
          crmTraderId,
          firstName,
          lastName,
          brandId,
        },
      };
      return traderPayload;
    });

    return TradersRepository.bulkCreateOrUpdateStatic(tradersToCreate);
  }

  async formUpdateCronFunction(brandApi: BrandUpdateApiEntity) {
    const urlWithParams = formApiUrl(brandApi);
    let nextUrl = urlWithParams;

    while (nextUrl) {
      const { data: traders, next } = await this._getDataAndNextPaginationUrl(
        nextUrl,
        brandApi,
      );
      nextUrl = next;

      const mappedTradersToDBFormat = mapUpdateCrmResponse(traders, brandApi);

      await this.updateTradersByCrmIdBulk(
        mappedTradersToDBFormat,
        brandApi.brandId,
      );
    }
  }

  async formPullCronFunction(brandApi: BrandUpdateApiEntity) {
    const urlWithParams = formApiUrl(brandApi);
    let nextUrl = urlWithParams;

    while (nextUrl) {
      const { data: traders, next } = await this._getDataAndNextPaginationUrl(
        nextUrl,
        brandApi,
      );
      nextUrl = next;

      const mappedTradersToDBFormat = mapUpdateCrmResponse(traders, brandApi);

      await this.createNewTradersBulk(
        mappedTradersToDBFormat,
        brandApi.brandId,
      );
    }
  }

  async startUpdateScheduleApiJobs(): Promise<BrandEntity[]> {
    const [brands] = await BrandsRepository.findAndCountStatic({
      relations: [
        'brandPullApis',
        'brandUpdateApis',
        'brandPullApis.queryParams',
        'brandPullApis.keyToColumnMappings',
        'brandUpdateApis.queryParams',
        'brandUpdateApis.keyToColumnMappings',
      ],
    });

    brands.forEach((brand) => {
      const { brandPullApis, brandUpdateApis } = brand;

      brandPullApis.filter(filterValidBrandApi).forEach((api) => {
        startNewCronJob(api, () => this.formPullCronFunction(api));
      });

      brandUpdateApis.filter(filterValidBrandApi).forEach((api) => {
        startNewCronJob(api, () => this.formUpdateCronFunction(api));
      });
    });

    return brands;
  }

  private _getDataAndNextPaginationUrl = async (url, brandApi) => {
    const { queryParams } = brandApi;

    const res = await axios
      .get(url)
      .then((res: any) => res.data)
      .catch(handleApiError);

    const {
      data,
      meta: {
        pagination: {
          links: { next },
        },
      },
    } = res;
    const nextUrl = concatUrl([next], queryParams);

    return {
      data,
      next: nextUrl,
    };
  };
}
