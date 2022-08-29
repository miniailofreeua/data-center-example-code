import { FAKE_LOGIN_USER, API_ERROR } from './actionTypes';

export const fakeLogin = (user) => {
  return {
    type: FAKE_LOGIN_USER,
    payload: { user },
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
