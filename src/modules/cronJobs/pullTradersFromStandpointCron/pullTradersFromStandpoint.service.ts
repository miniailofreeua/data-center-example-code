import { Injectable } from '@nestjs/common';

import { StandpointCrmName } from 'src/infrastructure/enums/StandpointCrmName';
import { BrandsService } from 'src/modules/brands/brands.service';
import { TraderCredentialsService } from 'src/modules/traderCredentials/traderCredentials.service';
import { MapTradersHelper } from 'src/modules/traders/helpers/map.helper';
import { TradersService } from 'src/modules/traders/services/traders.service';
import { TradersToBrandsService } from 'src/modules/tradersToBrands/tradersToBrand.service';
import { GetStandpointHelper } from '../helpers/getStandpoint.helper';

import { PullTradersFromStandpointMapHelper } from './pullTradersFromStandpoint.mapper';

@Injectable()
export class PullTradersFromStandpointService {
  constructor(
    private readonly _tradersService: TradersService,
    private readonly _brandService: BrandsService,
    private readonly _tradersToBrandsService: TradersToBrandsService,
    private readonly _mapHelper: PullTradersFromStandpointMapHelper,
    private readonly _traderCredentialsService: TraderCredentialsService,
    private readonly _getStandpointHelper: GetStandpointHelper,
    private readonly _mapTradersHelper: MapTradersHelper,
  ) {}

  public async pullTradersFromStandpoint(
    standpointCrmName: StandpointCrmName,
  ): Promise<any> {
    const brand = await this._brandService.findOne({
      name: standpointCrmName,
    });

    const lastRecord = await this._tradersToBrandsService.findLastRecord({
      brandId: brand.id,
    });

    const getTradersPlusRange = Number(process.env.TRADERS_TO_TAKE) || 100;

    const lastCrmId = lastRecord
      ? lastRecord.crmTraderId + getTradersPlusRange
      : 0;

    const urlParams = `&page=2789`;

    const standpointTraders: any =
      await this._getStandpointHelper.getTradersFromStandpoint(
        standpointCrmName,
        urlParams,
      );

    const MappedTradersObj =
      this._mapTradersHelper.mapTradersFromStandpoint(standpointTraders);

    const { queryArray, mappedTraders } = MappedTradersObj;

    const {
      createdTraders,
      filteredTradersToBrands,
      filteredTradersToBrandsDuplicateAccount,
    } = await this._tradersService.create({ queryArray, mappedTraders });

    const { mappedFilteredTraderToBrands, mappedFilteredTraderCredentials } =
      await this._mapHelper.mapFilteredTraderToBrands({
        createdTraders,
        filteredTradersToBrands,
        brand,
        filteredTradersToBrandsDuplicateAccount,
      });

    await this._tradersToBrandsService.createTraderToBrandsBulk(
      mappedFilteredTraderToBrands,
    );

    await this._traderCredentialsService.createAndReturn(
      mappedFilteredTraderCredentials,
    );
  }
}
