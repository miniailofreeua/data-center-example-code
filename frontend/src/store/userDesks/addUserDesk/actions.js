import { ADD_USER_DESK, ADD_USER_DESK_SUCCESS, API_ERROR } from './actionTypes';

export const addUserDesk = (payload) => {
  return {
    type: ADD_USER_DESK,
    payload: payload,
  };
};

export const addUserDeskSuccess = () => {
  return {
    type: ADD_USER_DESK_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
