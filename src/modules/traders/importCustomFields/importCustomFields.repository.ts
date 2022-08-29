import { EntityRepository, Repository } from 'typeorm';
import { ImportCustomFieldEntity } from './importCustomFields.entity';

@EntityRepository(ImportCustomFieldEntity)
class ImportCustomFieldsRepository extends Repository<ImportCustomFieldEntity> {
  async createUpdateOrDelete(
    payload: Partial<ImportCustomFieldEntity[]>,
  ): Promise<void> {
    await this.save(payload);

    const entity = await this.find();

    const entitiesToDelete = entity.filter(
      (e) => !payload.some((p) => p.columnName === e.columnName),
    );

    await this.remove(entitiesToDelete);

    return;
  }
}

export { ImportCustomFieldsRepository };
