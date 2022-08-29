import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetTradersController } from './getTraders.controller';
import { GetTradersService } from './getTraders.service';
import { TradersModule } from '../traders.module';
import { TradersToBrandsModule } from 'src/modules/tradersToBrands/tradersToBrands.module';
import { TraderCredentialsModule } from 'src/modules/traderCredentials/traderCredentials.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    TradersModule,
    TradersToBrandsModule,
    TraderCredentialsModule,
  ],
  controllers: [GetTradersController],
  providers: [GetTradersService],
  exports: [GetTradersService],
})
export class GetTradersModule {}
