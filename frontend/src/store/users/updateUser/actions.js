import { API_ERROR, UPDATE_USER, UPDATE_USER_SUCCESS } from './actionTypes';

export const updateUser = ({ payload, userId, isCascadeUpdateAllowed }) => {
  return {
    type: UPDATE_USER,
    isCascadeUpdateAllowed,
    payload,
    userId,
  };
};

export const updateUserSuccess = () => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
