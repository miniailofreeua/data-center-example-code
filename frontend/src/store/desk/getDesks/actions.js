import {
  GET_DESKS,
  GET_DESKS_SUCCESS,
  API_ERROR,
  CLEAR_GET_DESKS_STATE,
} from './actionTypes';

export const getDesks = () => {
  return {
    type: GET_DESKS,
    payload: {},
  };
};

export const clearGetDesksState = () => {
  return {
    type: CLEAR_GET_DESKS_STATE,
    payload: {},
  };
};

export const getDesksSuccess = (payload) => {
  return {
    type: GET_DESKS_SUCCESS,
    payload: payload,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
