import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandPullApisRepository } from './brandPullApis.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BrandPullApisRepository])],
  controllers: [],
  providers: [],
  exports: [],
})
export class BrandPullApisModule {}
