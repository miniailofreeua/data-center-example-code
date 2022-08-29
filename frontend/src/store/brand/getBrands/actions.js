import {
  GET_BRANDS,
  GET_BRANDS_SUCCESS,
  API_ERROR,
  CLEAR_GET_BRANDS_STATE,
} from './actionTypes';

export const getBrands = () => {
  return {
    type: GET_BRANDS,
    payload: {},
  };
};

export const clearGetBrandsState = () => {
  return {
    type: CLEAR_GET_BRANDS_STATE,
    payload: {},
  };
};

export const getBrandsSuccess = (payload) => {
  return {
    type: GET_BRANDS_SUCCESS,
    payload: payload,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
