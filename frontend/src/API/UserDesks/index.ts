import { IApiCall } from '../interfaces';
import { request } from '../request';
import { getConfigParams } from '../configParams';

export function createUserDeskRequest(payload: IApiCall) {
  const url = 'userDesks';
  const config = getConfigParams({
    url,
    method: 'POST',
  });

  return request(config, payload);
}

export function deleteUserDeskRequest(userDeskId: number) {
  const url = `userDesks/${userDeskId}`;
  const config = getConfigParams({
    url,
    method: 'DELETE',
  });

  return request(config);
}
