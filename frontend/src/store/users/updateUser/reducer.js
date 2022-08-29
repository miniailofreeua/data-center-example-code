import { API_ERROR, UPDATE_USER, UPDATE_USER_SUCCESS } from './actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const UpdateUser = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;

    case UPDATE_USER_SUCCESS:
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

export default UpdateUser;
