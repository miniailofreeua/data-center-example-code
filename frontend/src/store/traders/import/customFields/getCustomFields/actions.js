import {
  API_ERROR,
  GET_CUSTOM_FIELDS_SUCCESS,
  GET_CUSTOM_FIELDS,
  CLEAR_GET_CUSTOM_FIELDS_STATE,
} from './actionTypes';

export const clearGetCustomFieldsState = () => {
  return {
    type: CLEAR_GET_CUSTOM_FIELDS_STATE,
  };
};

export const getCustomFields = () => {
  return {
    type: GET_CUSTOM_FIELDS,
  };
};

export const getCustomFieldsSuccess = (fields) => {
  return {
    type: GET_CUSTOM_FIELDS_SUCCESS,
    payload: fields,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
