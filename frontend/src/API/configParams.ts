import { storage } from './../services/storage';
import { AxiosRequestConfig, Method } from 'axios';
import _ from 'lodash';

const { hostname, origin } = window.location;
const LOCAL_API_ROUTE = 'http://localhost:3031/secretapi/zshv1/';
const PROD_API_ROUTE = origin + '/secretapi/zshv1/';
const FAKE_API_ROUTE = 'http://localhost:3031/';

const host = hostname === 'localhost' ? LOCAL_API_ROUTE : PROD_API_ROUTE;

const getBaseUrl = (route: string, fake?: boolean): string => {
  if (!fake) {
    return route.indexOf('http') !== -1 ? route : `${host}${route}`;
  } else {
    return `${FAKE_API_ROUTE}${route}`;
  }
};

interface IConfigParams {
  url: string;
  skipAuth?: boolean;
  skipUser?: boolean;
  options?: object;
  method: Method;
  fake?: boolean;
}

export interface IRequestConfig {
  url: string;
  skipAuth?: boolean;
  method: string;
}

export const getConfigParams = ({
  url,
  options,
  method,
  skipAuth,
  fake,
}: IConfigParams): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    method,
    url: getBaseUrl(url, fake),
    headers: {},
  };

  if (!skipAuth) {
    const token =
      storage.get('accessToken') || window.localStorage.getItem('accessToken');

    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  if (!options) {
    return config;
  }

  const optionStrings = _.flatMap(options, (value, key) => {
    if (Array.isArray(value)) {
      return _.map(
        value,
        (item: string | number | boolean) =>
          `${key}=${encodeURIComponent(item)}`,
      );
    } else {
      return `${key}=${encodeURIComponent(value)}`;
    }
  });

  config.url += `?${optionStrings.join('&')}`;

  return config;
};
