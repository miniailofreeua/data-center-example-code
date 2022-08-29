import { Repository, EntityRepository } from 'typeorm';
import { BrandUpdateApiEntity } from './brandUpdateApis.entity';

@EntityRepository(BrandUpdateApiEntity)
class BrandUpdateApisRepository extends Repository<BrandUpdateApiEntity> {}

export { BrandUpdateApisRepository };
