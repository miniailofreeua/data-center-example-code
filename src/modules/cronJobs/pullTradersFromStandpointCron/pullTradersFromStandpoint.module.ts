import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { PullTradersFromStandpointController } from './pullTradersFromStandpoint.controller';
import { PullTradersFromStandpointService } from './pullTradersFromStandpoint.service';
import { PullTradersFromStandpointMapHelper } from './pullTradersFromStandpoint.mapper';
import { TradersModule } from 'src/modules/traders/traders.module';
import { TradersToBrandsModule } from 'src/modules/tradersToBrands/tradersToBrands.module';
import { BrandsModule } from 'src/modules/brands/brands.module';
import { TraderCredentialsModule } from 'src/modules/traderCredentials/traderCredentials.module';
import { GetStandpointHelper } from '../helpers/getStandpoint.helper';
import { MapTradersHelper } from 'src/modules/traders/helpers/map.helper';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    ScheduleModule.forRoot(),
    TradersModule,
    TradersToBrandsModule,
    BrandsModule,
    TraderCredentialsModule,
    GetStandpointHelper,
    MapTradersHelper,
  ],
  controllers: [PullTradersFromStandpointController],
  providers: [
    PullTradersFromStandpointService,
    PullTradersFromStandpointMapHelper,
    GetStandpointHelper,
    MapTradersHelper,
  ],
})
export class PullTradersFromStandpointModule {}
