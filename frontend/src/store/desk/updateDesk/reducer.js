import { UPDATE_DESK, UPDATE_DESK_SUCCESS, API_ERROR } from './actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const UpdateDesk = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DESK:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case UPDATE_DESK_SUCCESS:
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

export default UpdateDesk;
