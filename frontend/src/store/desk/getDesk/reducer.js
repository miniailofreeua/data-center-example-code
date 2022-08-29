import {
  GET_DESK,
  GET_DESK_SUCCESS,
  API_ERROR,
  CLEAR_GET_DESK_STATE,
} from './actionTypes';

const initialState = {
  current: null,
  error: null,
  loading: false,
};

const GetDesk = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GET_DESK_STATE:
      state = {
        ...initialState,
      };
      break;
    case GET_DESK:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_DESK_SUCCESS:
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

export default GetDesk;
