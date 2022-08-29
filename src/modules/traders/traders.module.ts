import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { BrandsModule } from '../brands/brands.module';
import { TradersToBrandsModule } from '../tradersToBrands/tradersToBrands.module';

import { TradersToBrandsService } from '../tradersToBrands/tradersToBrand.service';
import { BrandsService } from '../brands/brands.service';

import { BrandsRepository } from '../brands/brands.repository';
import { TraderCredentialsRepository } from '../traderCredentials/traderCredentials.repository';
import { TradersRepository } from './traders.repository';
import { TradersToBrandsRepository } from '../tradersToBrands/tradersToBrands.repository';

import { FindDuplicatesHelper } from '../cronJobs/helpers/findDuplicate.helper';
import { HashAndFilterHelper } from './helpers/hashAndFilter.helper';
import { TradersController } from './traders.controller';
import { TradersService } from './services/traders.service';
import { ImportTradersService } from './services/import-traders.service';
import { TraderCredentialsModule } from '../traderCredentials/traderCredentials.module';
import { MapTradersHelper } from './helpers/map.helper';
import { CronManager } from 'src/services/CronManager.service';
import { ImportCustomFieldsRepository } from './importCustomFields/importCustomFields.repository';
import { ImportCustomFieldsService } from './importCustomFields/importCustomFields.service';
import { BrandPullApisRepository } from '../brands/modules/brandPullApis/brandPullApis.repository';
import { BrandUpdateApisRepository } from '../brands/modules/brandUpdateApis/brandUpdateApis.repository';
import { QueryParamsRepository } from '../brands/modules/queryParams/queryParams.repository';
import { KeyToColumnMappingsRepository } from '../brands/modules/keyToColumnMappings/keyToColumnMappings.repository';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    TypeOrmModule.forFeature([
      TradersRepository,
      TradersToBrandsRepository,
      BrandsRepository,
      TraderCredentialsRepository,
      ImportCustomFieldsRepository,
    ]),
    TradersToBrandsModule,
    TraderCredentialsModule,
    BrandsModule,
    MapTradersHelper,
    CronManager,
  ],
  controllers: [TradersController],
  providers: [
    QueryParamsRepository,
    KeyToColumnMappingsRepository,
    BrandUpdateApisRepository,
    BrandPullApisRepository,
    ImportCustomFieldsService,
    TradersService,
    ImportTradersService,
    TradersToBrandsService,
    BrandsService,
    FindDuplicatesHelper,
    HashAndFilterHelper,
    MapTradersHelper,
    CronManager,
  ],
  exports: [TradersService, ImportTradersService],
})
export class TradersModule {}
