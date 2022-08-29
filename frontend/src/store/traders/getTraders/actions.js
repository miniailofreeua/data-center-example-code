import {
  GET_TRADERS,
  GET_TRADER_SUCCESS,
  API_ERROR,
  CLEAR_GET_TRADERS_STATE,
} from './actionTypes';

export const getTraders = ({ take, skip }) => {
  return {
    type: GET_TRADERS,
    options: { take, skip },
  };
};

export const clearGetTradersState = () => {
  return {
    type: CLEAR_GET_TRADERS_STATE,
    payload: {},
  };
};

export const getTradersSuccess = ({ list, count }) => {
  return {
    type: GET_TRADER_SUCCESS,
    payload: { list, count },
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
