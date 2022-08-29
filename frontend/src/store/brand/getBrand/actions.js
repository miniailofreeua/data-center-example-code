import {
  API_ERROR,
  GET_BRAND_SUCCESS,
  GET_BRAND,
  CLEAR_GET_BRAND_STATE,
} from './actionTypes';

export const clearGetBrandState = (brandId) => {
  return {
    type: CLEAR_GET_BRAND_STATE,
    payload: brandId,
  };
};

export const getBrand = (brandId) => {
  return {
    type: GET_BRAND,
    payload: brandId,
  };
};

export const getBrandSuccess = (brand) => {
  return {
    type: GET_BRAND_SUCCESS,
    payload: brand,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
