import {
  API_ERROR,
  GET_USER_SUCCESS,
  GET_USER,
  CLEAR_GET_USER_STATE,
} from './actionTypes';

export const clearGetUserState = (userId) => {
  return {
    type: CLEAR_GET_USER_STATE,
    payload: userId,
  };
};

export const getUser = (userId) => {
  return {
    type: GET_USER,
    payload: userId,
  };
};

export const getUserSuccess = (user) => {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
