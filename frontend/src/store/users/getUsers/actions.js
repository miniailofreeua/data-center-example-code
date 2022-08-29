import {
  GET_USERS,
  GET_USERS_SUCCESS,
  API_ERROR,
  CLEAR_GET_USERS_STATE,
} from './actionTypes';

export const clearGetUsersState = () => {
  return {
    type: CLEAR_GET_USERS_STATE,
    payload: {},
  };
};

export const getUsers = (options) => {
  return {
    type: GET_USERS,
    options,
  };
};

export const getUsersSuccess = (payload) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: payload,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
