import { KeyToColumnMappingEntity } from '../modules/keyToColumnMappings/keyToColumnMappings.entity';

export const getKeyToColumnMappingsFromApis = (
  apis,
): KeyToColumnMappingEntity[] =>
  apis.reduce((acc, curr) => [...acc, ...curr.keyToColumnMappings], []);
