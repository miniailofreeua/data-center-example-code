import {
  ForbiddenException,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not } from 'typeorm';
import bcrypt from 'bcrypt';
import { concat } from 'lodash';

import { BrandEntity } from './brands.entity';
import { BrandsRepository } from './brands.repository';
import { PartialUpdateBrandDto } from './dtos/partial-update-brand-dto';
import { CronManager } from 'src/services/CronManager.service';
import { BrandApiCronJobMangerService } from './services/brand-api-cron-job-manager.service';
import { getCronJobNameForBrand } from './helpers/getUpdateCronJobNameForBrand.helper';
import { BrandUpdateApisRepository } from './modules/brandUpdateApis/brandUpdateApis.repository';
import { QueryParamsRepository } from './modules/queryParams/queryParams.repository';
import { KeyToColumnMappingsRepository } from './modules/keyToColumnMappings/keyToColumnMappings.repository';
import { getQueryParamsFromApis } from './helpers/getQueryParamsFromApis';
import { getKeyToColumnMappingsFromApis } from './helpers/getKeyToColumnMappingsFromApis';
import {
  getBrandPullApisToCreate,
  getBrandPullApisToRestart,
  getBrandPullApisToTerminate,
} from './helpers/getBrandPullApisToRestart.helper';
import {
  getBrandUpdateApisToRestart,
  getBrandUpdateApisToTerminate,
} from './helpers/getBrandUpdateApisToRestart.helper';
import { CreateBrandDto } from './dtos/create-brand.dto';

export type queryBrand = {
  name: string;
};

@Injectable()
export class BrandsService {
  create: any;
  constructor(
    @InjectRepository(BrandsRepository)
    private readonly _brandsRepository: BrandsRepository,
    private readonly _cronManager: CronManager,
    private readonly _brandApiCronJobMangerService: BrandApiCronJobMangerService,

    private readonly _brandPullApisRepository: BrandUpdateApisRepository,
    private readonly _brandUpdateApisRepository: BrandUpdateApisRepository,
    private readonly _queryParamsRepository: QueryParamsRepository,
    private readonly _keyToColumnMappingsRepository: KeyToColumnMappingsRepository,
  ) {}

  private async _validateWebhookToken(hash) {
    if (!hash) {
      throw new PreconditionFailedException('Token is missed');
    }
    const isMatch = bcrypt.compare(process.env.SECRET_CONNECTOR, hash);
    if (!isMatch) {
      throw new ForbiddenException('Token is not valid');
    }
  }

  async getList(
    query,
  ): Promise<Error | { list: BrandEntity[]; count: number }> {
    const { take, skip, searchText, selectedId } = query;
    const [list, count] = await this._brandsRepository.findAndCount({
      where: {
        ...(searchText && { name: ILike(`%${searchText}%`) }),
        ...(selectedId && { id: Not(selectedId) }),
      },
      take,
      skip,
      order: {
        createdAt: 'DESC',
      },
    });

    if (selectedId) {
      const selectedBrand = await this._brandsRepository.findOne(selectedId);
      if (selectedBrand) {
        list.push(selectedBrand);
      }
    }

    return {
      list,
      count,
    };
  }

  async getBrandListStatic(): Promise<BrandEntity[]> {
    const [list] = await BrandsRepository.findAndCountStatic({
      relations: ['queryParams', 'keyToColumnMappings'],
    });
    return list;
  }

  async findOne(payload): Promise<any> {
    return this._brandsRepository.findOne(payload);
  }

  async findOneWebhook(query, data): Promise<any> {
    const { token } = query;
    const { brandDataCenterId } = data;
    await this._validateWebhookToken(token);
    return this._brandsRepository.findOne(brandDataCenterId);
  }

  private async _deleteBrandUpdateApis(
    brandId: number,
    payload: PartialUpdateBrandDto,
  ) {
    const brand = await this._brandsRepository.findOne(brandId, {
      relations: [
        'brandPullApis',
        'brandUpdateApis',
        'brandPullApis.queryParams',
        'brandPullApis.keyToColumnMappings',
        'brandUpdateApis.queryParams',
        'brandUpdateApis.keyToColumnMappings',
      ],
    });
    const updateApisToDelete = brand.brandUpdateApis.filter(
      (bua) => !payload.brandUpdateApis.find(({ id }) => id === bua.id),
    );
    const pullApisToDelete = brand.brandPullApis.filter(
      (bua) => !payload.brandPullApis.find(({ id }) => id === bua.id),
    );

    await this._queryParamsRepository.remove(
      getQueryParamsFromApis(updateApisToDelete),
    );
    await this._queryParamsRepository.remove(
      getQueryParamsFromApis(pullApisToDelete),
    );
    await this._keyToColumnMappingsRepository.remove(
      getKeyToColumnMappingsFromApis(updateApisToDelete),
    );
    await this._keyToColumnMappingsRepository.remove(
      getKeyToColumnMappingsFromApis(pullApisToDelete),
    );

    await this._brandUpdateApisRepository.remove(updateApisToDelete);
    await this._brandPullApisRepository.remove(pullApisToDelete);
  }

  private async _updateAndCreateBrandCronJobs(
    brandId: number,
    payload: PartialUpdateBrandDto,
  ) {
    const brand = await this._brandsRepository.findOne(brandId, {
      relations: ['brandPullApis', 'brandUpdateApis'],
    });

    getBrandPullApisToRestart(brand, payload).forEach((brandApiJob) => {
      const previousJobName = brand.brandPullApis.find(
        (d) => d.id === brandApiJob.id,
      )?.name;
      this._cronManager.stopCronJob(previousJobName);
      this._cronManager.addNewJob(brandApiJob, () =>
        this._brandApiCronJobMangerService.formPullCronFunction(brandApiJob),
      );
    });
    getBrandPullApisToCreate(payload).forEach((brandApiJob) => {
      this._cronManager.addNewJob(brandApiJob, () =>
        this._brandApiCronJobMangerService.formPullCronFunction(brandApiJob),
      );
    });

    getBrandPullApisToTerminate(brand, payload).forEach((brandApiJob) =>
      this._cronManager.stopCronJob(getCronJobNameForBrand(brandApiJob)),
    );

    getBrandUpdateApisToRestart(brand, payload).forEach((brandApiJob) => {
      const previousJobName = brand.brandPullApis.find(
        (d) => d.id === brandApiJob.id,
      )?.name;
      this._cronManager.stopCronJob(previousJobName);
      this._cronManager.addNewJob(brandApiJob, () =>
        this._brandApiCronJobMangerService.formUpdateCronFunction(brandApiJob),
      );
    });

    getBrandUpdateApisToTerminate(brand, payload).forEach((brandApiJob) =>
      this._cronManager.stopCronJob(getCronJobNameForBrand(brandApiJob)),
    );
  }

  async createOne(brand: CreateBrandDto): Promise<BrandEntity> {
    const savedBrand = await this._brandsRepository.createAndReturn(brand);
    await this._updateAndCreateBrandCronJobs(savedBrand.id, savedBrand);
    return savedBrand;
  }

  async updateBrand(
    brandId: number,
    payload: PartialUpdateBrandDto,
  ): Promise<Error | BrandEntity> {
    await this._updateAndCreateBrandCronJobs(brandId, payload);
    await this._deleteBrandUpdateApis(brandId, payload);
    return this._brandsRepository.updateEntity(brandId, payload);
  }

  async getBrand(brandId: number): Promise<BrandEntity> {
    const brand = await this._brandsRepository.findOne(brandId, {
      relations: [
        'brandPullApis',
        'brandUpdateApis',
        'brandPullApis.queryParams',
        'brandPullApis.keyToColumnMappings',
        'brandUpdateApis.queryParams',
        'brandUpdateApis.keyToColumnMappings',
      ],
    });

    return brand;
  }
}
