import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { UserBrandsRepository } from './userBrands.repository';

import { UserBrandsService } from './userBrands.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    TypeOrmModule.forFeature([UserBrandsRepository]),
  ],
  controllers: [],
  providers: [UserBrandsService],
  exports: [UserBrandsService],
})
export class UserBrandsModule {}
