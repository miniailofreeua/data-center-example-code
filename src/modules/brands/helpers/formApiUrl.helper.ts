import {
  getDateFromQueryParamDateEnum,
  QueryParamDateValueList,
} from 'src/infrastructure/enums/QueryParamDate.enum';
import { concatUrl } from 'src/infrastructure/helpers/concatUrl.helper';
import { BrandUpdateApiEntity } from '../modules/brandUpdateApis/brandUpdateApis.entity';

const mapQueryParams = (queryParam) => {
  const { key, value } = queryParam;
  if (QueryParamDateValueList.includes(value)) {
    return { key, value: getDateFromQueryParamDateEnum(value) };
  }
  return { key, value };
};

export const formApiUrl = (brand: BrandUpdateApiEntity): string => {
  const { domain, apiUrl, queryParams } = brand;
  if (!domain || !apiUrl) {
    return null;
  }
  const urlWithParams = concatUrl(
    [domain, apiUrl],
    queryParams.map(mapQueryParams),
  );
  return urlWithParams;
};
