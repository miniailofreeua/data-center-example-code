import { IApiCall } from '../interfaces';
import { request } from '../request';
import { getConfigParams } from '../configParams';

export function getUsersRequest(options: object) {
  const url = 'users';
  const config = getConfigParams({
    url,
    method: 'GET',
    options,
  });
  return request(config);
}

export function preloadAgentList(options: object) {
  const url = 'users/preload-agents';
  const config = getConfigParams({
    url,
    method: 'GET',
    options,
  });
  return request(config);
}
export function preloadCompanyList(options: object) {
  const url = 'users/preload-company';
  const config = getConfigParams({
    url,
    method: 'GET',
    options,
  });
  return request(config);
}

export function preloadTeamLeadList(options: object) {
  const url = 'users/preload-team-leads';
  const config = getConfigParams({
    url,
    method: 'GET',
    options,
  });
  return request(config);
}

export function getUserRequest(userId: number) {
  const url = `users/${userId}`;
  const config = getConfigParams({
    url,
    method: 'GET',
  });
  return request(config);
}

export function getCurrentUserRequest() {
  const url = 'users/current';
  const config = getConfigParams({
    url,
    method: 'GET',
  });
  return request(config);
}

export function updateUserRequest(
  userId: number,
  payload: object,
  options: object,
) {
  const url = `users/${userId}`;
  const config = getConfigParams({
    url,
    method: 'PUT',
    options,
  });
  return request(config, payload);
}

export function createUserRequest(payload: IApiCall) {
  const url = 'users';
  const config = getConfigParams({
    url,
    method: 'POST',
  });

  return request(config, payload);
}
