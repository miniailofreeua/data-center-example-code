import { CREATE_DESK, CREATE_DESK_SUCCESS, API_ERROR } from './actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const CreateDesk = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DESK:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case CREATE_DESK_SUCCESS:
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

export default CreateDesk;
