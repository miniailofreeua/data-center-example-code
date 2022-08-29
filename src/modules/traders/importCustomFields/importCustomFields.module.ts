import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImportCustomFieldsService } from './importCustomFields.service';
import { ImportCustomFieldsRepository } from './importCustomFields.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImportCustomFieldsRepository])],
  controllers: [],
  providers: [ImportCustomFieldsService],
  exports: [ImportCustomFieldsService],
})
export class ImportCustomFieldsModule {}
