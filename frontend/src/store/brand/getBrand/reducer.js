import {
  GET_BRAND,
  GET_BRAND_SUCCESS,
  API_ERROR,
  CLEAR_GET_BRAND_STATE,
} from './actionTypes';

const initialState = {
  current: null,
  error: null,
  loading: false,
};

const GetBrand = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GET_BRAND_STATE:
      state = {
        ...initialState,
      };
      break;
    case GET_BRAND:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_BRAND_SUCCESS:
      state = {
        ...state,
        current: action.payload,
        loading: false,
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

export default GetBrand;
