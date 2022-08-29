import { Repository, EntityRepository } from 'typeorm';
import { KeyToColumnMappingEntity } from './keyToColumnMappings.entity';

@EntityRepository(KeyToColumnMappingEntity)
class KeyToColumnMappingsRepository extends Repository<KeyToColumnMappingEntity> {}

export { KeyToColumnMappingsRepository };
