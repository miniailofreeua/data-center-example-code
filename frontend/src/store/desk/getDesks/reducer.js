import {
  GET_DESKS,
  GET_DESKS_SUCCESS,
  API_ERROR,
  CLEAR_GET_DESKS_STATE,
} from './actionTypes';

const initialState = {
  list: [],
  error: null,
  loading: false,
};

const GetDesks = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GET_DESKS_STATE:
      state = {
        ...initialState,
      };
      break;
    case GET_DESKS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_DESKS_SUCCESS:
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

export default GetDesks;
