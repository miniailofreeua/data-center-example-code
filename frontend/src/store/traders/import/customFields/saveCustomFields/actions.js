import {
  CREATE_CUSTOM_FIELDS,
  CREATE_CUSTOM_FIELDS_SUCCESS,
  API_ERROR,
} from './actionTypes';

export const createCustomFields = (payload) => {
  return {
    type: CREATE_CUSTOM_FIELDS,
    payload: payload,
  };
};

export const createCustomFieldsSuccess = () => {
  return {
    type: CREATE_CUSTOM_FIELDS_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
