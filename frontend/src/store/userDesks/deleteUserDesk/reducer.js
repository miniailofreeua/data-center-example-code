import {
  API_ERROR,
  DELETE_USER_DESK,
  DELETE_USER_DESK_SUCCESS,
} from './actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const UpdateSale = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_DESK:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;

    case DELETE_USER_DESK_SUCCESS:
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

export default UpdateSale;
