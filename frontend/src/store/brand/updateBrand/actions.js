import { UPDATE_BRAND, UPDATE_BRAND_SUCCESS, API_ERROR } from './actionTypes';

export const updateBrand = (brandId, payload) => {
  return {
    type: UPDATE_BRAND,
    payload: payload,
    brandId,
  };
};

export const updateBrandSuccess = () => {
  return {
    type: UPDATE_BRAND_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
