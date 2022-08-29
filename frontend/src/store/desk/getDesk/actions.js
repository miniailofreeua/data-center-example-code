import {
  API_ERROR,
  GET_DESK_SUCCESS,
  GET_DESK,
  CLEAR_GET_DESK_STATE,
} from './actionTypes';

export const clearGetDeskState = (deskId) => {
  return {
    type: CLEAR_GET_DESK_STATE,
    payload: deskId,
  };
};

export const getDesk = (deskId) => {
  return {
    type: GET_DESK,
    payload: deskId,
  };
};

export const getDeskSuccess = (desk) => {
  return {
    type: GET_DESK_SUCCESS,
    payload: desk,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
