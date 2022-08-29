import {
  GET_USERS,
  GET_USERS_SUCCESS,
  API_ERROR,
  CLEAR_GET_USERS_STATE,
} from './actionTypes';

const initialState = {
  list: [],
  count: 0,
  error: null,
  loading: false,
};

const GetUsers = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GET_USERS_STATE:
      state = {
        ...initialState,
      };
      break;
    case GET_USERS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_USERS_SUCCESS:
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

export default GetUsers;
