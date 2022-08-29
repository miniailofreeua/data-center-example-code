import {
  GET_TRADERS,
  GET_TRADER_SUCCESS,
  API_ERROR,
  CLEAR_GET_TRADERS_STATE,
} from './actionTypes';

const initialState = {
  list: [],
  count: 0,
  error: '',
  loading: false,
};

const GetTraders = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GET_TRADERS_STATE:
      state = {
        ...initialState,
      };
      break;
    case GET_TRADERS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_TRADER_SUCCESS:
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

export default GetTraders;
