import { CREATE_BRAND, CREATE_BRAND_SUCCESS, API_ERROR } from './actionTypes';

export const createBrand = (payload) => {
  return {
    type: CREATE_BRAND,
    payload: payload,
  };
};

export const createBrandSuccess = () => {
  return {
    type: CREATE_BRAND_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
