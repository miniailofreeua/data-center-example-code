import { set } from 'lodash';
import { BrandEntity } from '../brands.entity';
import { BrandUpdateApiEntity } from '../modules/brandUpdateApis/brandUpdateApis.entity';

export interface ICrmResponse {
  status?: 'success' | 'error';
  success?: boolean;
  url: string;
  object_id: number;
  errors: any[];
  message?: string;
}

// traders is expected to be of type any[] (type differs on crm api)
export const mapUpdateCrmResponse = (
  traders: any[],
  brandApi: BrandUpdateApiEntity,
): any[] => {
  const { keyToColumnMappings } = brandApi;
  const mappedTraders = traders.map((trader) => {
    const mappedTrader = {};

    keyToColumnMappings.forEach((map) => {
      const value = trader[map.key] === 'Empty' ? null : trader[map.key];
      const path = map.columnName.split('.');

      set(mappedTrader, path, value);
    });

    return mappedTrader;
  });
  return mappedTraders;
};
