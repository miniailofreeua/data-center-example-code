import { UPDATE_DESK, UPDATE_DESK_SUCCESS, API_ERROR } from './actionTypes';

export const updateDesk = (deskId, payload) => {
  return {
    type: UPDATE_DESK,
    payload: payload,
    deskId,
  };
};

export const updateDeskSuccess = () => {
  return {
    type: UPDATE_DESK_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
