import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  API_ERROR,
} from './actionTypes';

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const GetUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_CURRENT_USER_SUCCESS:
      state = {
        ...state,
        user: action.payload,
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
