import { CREATE_USER, CREATE_USER_SUCCESS, API_ERROR } from './actionTypes';

export const createUser = (payload) => {
  return {
    type: CREATE_USER,
    payload: payload,
  };
};

export const createUserSuccess = () => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
