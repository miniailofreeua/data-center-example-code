import { IApiCall } from '../interfaces';
import { request } from '../request';
import { getConfigParams } from '../configParams';

export function loginUser({ payload, options }: IApiCall) {
  const url = 'auth/login';
  const config = getConfigParams({
    url,
    method: 'POST',
    skipAuth: true,
    options,
  });
  return request(config, payload);
}

export function fakeLoginUser({ payload }: IApiCall) {
  const url = 'server-host/auth/admin/login';

  const config = getConfigParams({
    url,
    method: 'POST',
    skipAuth: true,
    fake: true,
  });
  return request(config, payload);
}

export function registerAdmin({ payload }: IApiCall) {
  const url = 'auth/register';
  const config = getConfigParams({
    url,
    method: 'POST',
  });
  return request(config, payload);
}
