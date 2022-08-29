import { IApiCall } from '../interfaces';
import { request } from '../request';
import { getConfigParams } from '../configParams';

export function getBrandsRequest(options: IApiCall) {
  const url = 'brands';
  const config = getConfigParams({
    url,
    method: 'GET',
    options,
  });
  return request(config);
}

export function getBrandRequest(brandId: number) {
  const url = `brands/${brandId}`;
  const config = getConfigParams({
    url,
    method: 'GET',
  });
  return request(config);
}

export function updateBrandRequest(brandId: number, payload: object) {
  const url = `brands/${brandId}`;
  const config = getConfigParams({
    url,
    method: 'PUT',
  });
  return request(config, payload);
}

export function createBrandRequest(payload: IApiCall) {
  const url = 'brands';
  const config = getConfigParams({
    url,
    method: 'POST',
  });
  return request(config, payload);
}
