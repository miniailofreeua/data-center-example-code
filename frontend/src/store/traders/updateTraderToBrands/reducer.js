import {
  API_ERROR,
  UPDATE_TRADER_TO_BRANDS,
  UPDATE_TRADER_TO_BRANDS_SUCCESS,
} from './actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const UpdateTraderToBrands = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TRADER_TO_BRANDS:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;

    case UPDATE_TRADER_TO_BRANDS_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
      };
      break;

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default UpdateTraderToBrands;
