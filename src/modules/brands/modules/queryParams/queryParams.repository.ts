import { Repository, EntityRepository } from 'typeorm';
import { QueryParamEntity } from './queryParams.entity';

@EntityRepository(QueryParamEntity)
class QueryParamsRepository extends Repository<QueryParamEntity> {}

export { QueryParamsRepository };
