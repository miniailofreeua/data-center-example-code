import { request } from '../request';
import { getConfigParams } from '../configParams';
import { IApiCall } from '../interfaces';

export function getTradersRequest(options: IApiCall) {
  const url = 'getTraders';
  const config = getConfigParams({
    url,
    method: 'GET',
    options,
  });
  return request(config);
}

export function getTradersProfileRequest(payload: IApiCall) {
  const url = 'getTraders/profiles';
  const config = getConfigParams({
    url,
    method: 'POST',
  });
  return request(config, payload);
}

export function updateTraderToBrandsRequest(traderId: number, payload: object) {
  const url = `tradersToBrands/${traderId}`;

  const config = getConfigParams({
    url,
    method: 'PUT',
  });
  return request(config, payload);
}

export function tradersImportParse(file: File, brandId: number) {
  const url = 'traders/import';
  const config = getConfigParams({
    url,
    options: { brandId },
    method: 'POST',
  });

  const isFile = true;
  return request(config, file, isFile);
}
export function createCustomFieldsRequest(payload: IApiCall) {
  const url = 'traders/import/fields';
  const config = getConfigParams({
    url,
    method: 'POST',
  });
  return request(config, payload);
}

export function getCustomFieldsRequest() {
  const url = 'traders/import/fields';
  const config = getConfigParams({
    url,
    method: 'GET',
  });
  return request(config);
}
