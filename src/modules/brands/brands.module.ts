import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsService } from './brands.service';
import { BrandsRepository } from './brands.repository';
import { BrandsController } from './brands.controller';
import { CronManager } from 'src/services/CronManager.service';
import { TradersService } from '../traders/services/traders.service';
import { TradersRepository } from '../traders/traders.repository';
import { TradersToBrandsRepository } from '../tradersToBrands/tradersToBrands.repository';
import { FindDuplicatesHelper } from '../cronJobs/helpers/findDuplicate.helper';
import { TraderCredentialsRepository } from '../traderCredentials/traderCredentials.repository';
import { HashAndFilterHelper } from '../traders/helpers/hashAndFilter.helper';
import { BrandApiCronJobMangerService } from './services/brand-api-cron-job-manager.service';
import { MapTradersHelper } from '../traders/helpers/map.helper';
import { BrandUpdateApisRepository } from './modules/brandUpdateApis/brandUpdateApis.repository';
import { BrandPullApisRepository } from './modules/brandPullApis/brandPullApis.repository';
import { QueryParamsRepository } from './modules/queryParams/queryParams.repository';
import { KeyToColumnMappingsRepository } from './modules/keyToColumnMappings/keyToColumnMappings.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BrandsRepository,
      TradersRepository,
      TradersToBrandsRepository,
      TraderCredentialsRepository,
      BrandUpdateApisRepository,
      BrandPullApisRepository,
      QueryParamsRepository,
      KeyToColumnMappingsRepository,
    ]),
    CronManager,
  ],
  controllers: [BrandsController],
  providers: [
    BrandsService,
    CronManager,
    TradersService,
    FindDuplicatesHelper,
    TraderCredentialsRepository,
    HashAndFilterHelper,
    BrandApiCronJobMangerService,
    MapTradersHelper,
  ],
  exports: [BrandsService, BrandApiCronJobMangerService],
})
export class BrandsModule {}
