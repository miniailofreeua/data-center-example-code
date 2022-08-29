import {
  GET_BRANDS,
  GET_BRANDS_SUCCESS,
  API_ERROR,
  CLEAR_GET_BRANDS_STATE,
} from './actionTypes';

const initialState = {
  list: [],
  count: null,
  error: null,
  loading: false,
};

const GetBrands = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GET_BRANDS_STATE:
      state = {
        ...initialState,
      };
      break;
    case GET_BRANDS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_BRANDS_SUCCESS:
      state = {
        ...state,
        list: action.payload.list,
        count: action.payload.count,
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

export default GetBrands;
