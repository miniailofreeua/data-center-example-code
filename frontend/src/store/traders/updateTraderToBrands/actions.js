import {
  API_ERROR,
  UPDATE_TRADER_TO_BRANDS,
  UPDATE_TRADER_TO_BRANDS_SUCCESS,
} from './actionTypes';

export const updateTraderToBrands = ({ payload, traderId }) => {
  return {
    type: UPDATE_TRADER_TO_BRANDS,
    payload,
    traderId,
  };
};

export const updateTraderToBrandsSuccess = () => {
  return {
    type: UPDATE_TRADER_TO_BRANDS_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
