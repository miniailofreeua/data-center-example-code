/* Hardcoded data should be changed with configurational file */
import axios, { AxiosRequestConfig } from 'axios';
import { forceLogout, cleanTokens } from '../services/logout';
import toastr from 'toastr';

interface IError {
  data: Error | any;
  code: number | string;
  status: number | string;
}

const getErrorMessage = (error: IError | Error) => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 500,
    };
  }

  return {
    message: error.data.message,
    code: error.status,
  };
};

export const request = (
  config: AxiosRequestConfig,
  payload?: any,
  isFile?: boolean,
) => {
  if (isFile && payload) {
    let data = new FormData();
    data.append('uri', payload.file);
    payload = data;
  }
  return axios({
    method: config.method,
    url: config.url,
    data: payload,
    headers: config.headers,
  })
    .then(async function (response) {
      return response.data;
    })
    .catch((err) => {
      const { message, code } = getErrorMessage(
        err?.response ? err.response : err,
      );

      if (code === 403) {
        toastr.error(message || 'The action is forbidden', 'Forbidden', {
          showDuration: 1000,
          timeOut: 10000,
          extendedTimeOut: 10000,
        });
        throw err;
      }

      if (code === 401 && message === 'Unauthorized') {
        window.location.pathname === '/register'
          ? cleanTokens()
          : forceLogout();

        toastr.error('Please log in to the system', 'Wrong authentication', {
          showDuration: 1000,
          timeOut: 10000,
          extendedTimeOut: 10000,
        });

        throw err;
      }

      if (message !== 'Error' && code !== 429) {
        toastr.error(message, 'Error', {
          showDuration: 1000,
          timeOut: 10000,
          extendedTimeOut: 10000,
        });
      }

      throw err;
    });
};

export const fakeRequest = (config: AxiosRequestConfig, payload?: object) => {
  return axios({
    method: config.method,
    url: config.url,
    data: payload,
    headers: config.headers,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(async function (error) {
      console.error(error);
      const { message, code } = getErrorMessage(error);
      if (code === 403) {
        forceLogout();
        return;
      }

      if (
        code === 401 &&
        (message === 'invalid signature' ||
          message === 'invalid token' ||
          message === 'jwt malformed')
      ) {
        window.location.pathname === '/register'
          ? cleanTokens()
          : forceLogout();
        return;
      }

      if (message !== 'Error' && code !== 429) {
        // TODO: add notifications
        // NotificationManager.error(message, code);
      }
      throw error;
    });
};
