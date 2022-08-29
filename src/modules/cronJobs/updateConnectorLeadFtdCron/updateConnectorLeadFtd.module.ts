import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TradersToBrandsService } from 'src/modules/tradersToBrands/tradersToBrand.service';
import { TradersToBrandsRepository } from 'src/modules/tradersToBrands/tradersToBrands.repository';
import { ConnectorApiService } from 'src/services/connector/connectorApi.service';
import { UpdateConnectorLeadFtdController } from './updateConnectorLeadFtd.controller';
import { UpdateConnectorLeadFtdService } from './updateConnectorLeadFtd.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([TradersToBrandsRepository]),
  ],
  controllers: [UpdateConnectorLeadFtdController],
  providers: [
    UpdateConnectorLeadFtdService,
    TradersToBrandsService,
    ConnectorApiService,
  ],
})
export class UpdateConnectorLeadFtdModule {}
