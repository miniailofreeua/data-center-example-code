import {
  DELETE_USER_DESK,
  DELETE_USER_DESK_SUCCESS,
  API_ERROR,
} from './actionTypes';

export const deleteUserDesk = ({ userId, id }) => {
  return {
    type: DELETE_USER_DESK,
    id,
    userId,
  };
};

export const deleteUserDeskSuccess = () => {
  return {
    type: DELETE_USER_DESK_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
