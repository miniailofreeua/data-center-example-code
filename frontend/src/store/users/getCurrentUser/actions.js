import {
  API_ERROR,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER,
} from './actionTypes';

export const getCurrentUser = () => {
  return {
    type: GET_CURRENT_USER,
  };
};

export const getCurrentUserSuccess = (user) => {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    payload: user,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
