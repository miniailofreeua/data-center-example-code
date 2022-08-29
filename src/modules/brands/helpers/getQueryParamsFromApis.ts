import { QueryParamEntity } from '../modules/queryParams/queryParams.entity';

export const getQueryParamsFromApis = (apis): QueryParamEntity[] =>
  apis.reduce((acc, curr) => [...acc, ...curr.queryParams], []);
