import {
  GET_USER,
  GET_USER_SUCCESS,
  API_ERROR,
  CLEAR_GET_USER_STATE,
} from './actionTypes';

const initialState = {
  current: null,
  error: null,
  loading: false,
};

const GetUser = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GET_USER_STATE:
      state = {
        ...initialState,
      };
      break;
    case GET_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_USER_SUCCESS:
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

export default GetUser;
