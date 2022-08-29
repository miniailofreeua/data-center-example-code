import {
  GET_TRADER_PROFILE,
  GET_TRADER_SUCCESS_PROFILE,
  CLEAR_GET_TRADER_PROFILE_STATE,
  API_ERROR,
} from './actionTypes';

export const getTraderProfile = (traderId) => {
  return {
    type: GET_TRADER_PROFILE,
    payload: { traderId },
  };
};

export const clearGetTraderProfileState = () => {
  return {
    type: CLEAR_GET_TRADER_PROFILE_STATE,
    payload: {},
  };
};

export const getTraderSuccessProfile = ({ credentials, profiles, trader }) => {
  return {
    type: GET_TRADER_SUCCESS_PROFILE,
    payload: { credentials, profiles, trader },
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
