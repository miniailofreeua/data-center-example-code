import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImportCustomFieldsRepository } from './importCustomFields.repository';
import { ImportCustomFieldEntity } from './importCustomFields.entity';

@Injectable()
export class ImportCustomFieldsService {
  create: any;
  constructor(
    @InjectRepository(ImportCustomFieldsRepository)
    private readonly _importCustomFieldsRepository: ImportCustomFieldsRepository,
  ) {}

  async getList(): Promise<ImportCustomFieldEntity[]> {
    const entity = await this._importCustomFieldsRepository.find();
    return entity;
  }

  async createUpdateOrDelete(
    payload: Partial<ImportCustomFieldEntity[]>,
  ): Promise<void> {
    await this._importCustomFieldsRepository.createUpdateOrDelete(payload);
  }
}
