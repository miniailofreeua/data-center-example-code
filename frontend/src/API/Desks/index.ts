import { IApiCall } from '../interfaces';
import { request } from '../request';
import { getConfigParams } from '../configParams';

export function getDesksRequest(options: IApiCall) {
  const url = 'desks';
  const config = getConfigParams({
    url,
    method: 'GET',
    options,
  });
  return request(config);
}

export function createDeskRequest(payload: IApiCall) {
  const url = 'desks';
  const config = getConfigParams({
    url,
    method: 'POST',
  });
  return request(config, payload);
}

export function getDeskRequest(deskId: number) {
  const url = `desks/${deskId}`;
  const config = getConfigParams({
    url,
    method: 'GET',
  });
  return request(config);
}

export function updateDeskRequest(deskId: number, payload: object) {
  const url = `desks/${deskId}`;
  const config = getConfigParams({
    url,
    method: 'PUT',
  });
  return request(config, payload);
}
