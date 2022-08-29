import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TraderCredentialsModule } from '../traderCredentials/traderCredentials.module';
import { CheckTraderHookController } from './tradersWebhooks.controller';
import { TraderWebhookService } from './tradersWebhooks.service';
import { TradersToBrandsModule } from '../tradersToBrands/tradersToBrands.module';
import { TradersModule } from '../traders/traders.module';
import { GetTradersService } from '../traders/getTraders/getTraders.service';
import { TradersToBrandsRepository } from '../tradersToBrands/tradersToBrands.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PullTradersFromStandpointMapHelper } from '../cronJobs/pullTradersFromStandpointCron/pullTradersFromStandpoint.mapper';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    TypeOrmModule.forFeature([TradersToBrandsRepository]),
    TraderCredentialsModule,
    TradersToBrandsModule,
    TradersModule,
  ],
  controllers: [CheckTraderHookController],
  providers: [
    TraderWebhookService,
    GetTradersService,
    PullTradersFromStandpointMapHelper,
  ],
  exports: [TraderWebhookService],
})
export class CheckTraderHookModule {}
