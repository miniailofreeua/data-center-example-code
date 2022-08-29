import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandUpdateApisRepository } from './brandUpdateApis.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BrandUpdateApisRepository])],
  controllers: [],
  providers: [],
  exports: [],
})
export class BrandUpdateApisModule {}
