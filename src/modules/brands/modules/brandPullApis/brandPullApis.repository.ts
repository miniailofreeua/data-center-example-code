import { Repository, EntityRepository } from 'typeorm';
import { BrandPullApiEntity } from './brandPullApis.entity';

@EntityRepository(BrandPullApiEntity)
class BrandPullApisRepository extends Repository<BrandPullApiEntity> {}

export { BrandPullApisRepository };
