import { Injectable } from '@nestjs/common';
import { Between, IsNull, Not } from 'typeorm';

import { ConnectorApiService } from 'src/services/connector/connectorApi.service';
import { TradersToBrandsService } from '../../tradersToBrands/tradersToBrand.service';
import getStartAndEndDayRangeHelper from '../helpers/getStartAndEndDayRange.helper';
import mapTraderBrandToLeadUpdateFtdMapper from '../mappers/mapTraderBrandToLeadUpdateFtd.mapper';

@Injectable()
export class UpdateConnectorLeadFtdService {
  constructor(
    private readonly _tradersToBrandsService: TradersToBrandsService,
    private readonly _connectorApiService: ConnectorApiService,
  ) {}
  async updateConnectorLeadFtd() {
    const [dayStart, dayEnd] = getStartAndEndDayRangeHelper();
    const traderToBrands = await this._tradersToBrandsService.find({
      leadId: Not(IsNull()),
      ftdDate: Between(dayStart, dayEnd),
    });

    if (traderToBrands.length === 0) {
      return null;
    }

    const connectorLeadsToUpdate = traderToBrands.map(
      mapTraderBrandToLeadUpdateFtdMapper,
    );

    return this._connectorApiService.updateTraderConnectorWebhook(
      connectorLeadsToUpdate,
    );
  }
}
