import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { TradersToBrandsRepository } from './tradersToBrands.repository';

import { TradersToBrandsService } from './tradersToBrand.service';
import { TradersToBrandsController } from './tradersToBrand.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    TypeOrmModule.forFeature([TradersToBrandsRepository]),
  ],
  controllers: [TradersToBrandsController],
  providers: [TradersToBrandsService],
  exports: [TradersToBrandsService],
})
export class TradersToBrandsModule {}
