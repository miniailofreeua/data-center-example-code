import { CREATE_DESK, CREATE_DESK_SUCCESS, API_ERROR } from './actionTypes';

export const createDesk = (payload) => {
  return {
    type: CREATE_DESK,
    payload: payload,
  };
};

export const createDeskSuccess = () => {
  return {
    type: CREATE_DESK_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
