import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryParamsRepository } from './queryParams.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QueryParamsRepository])],
  controllers: [],
  providers: [],
  exports: [],
})
export class QueryParamsModule {}
