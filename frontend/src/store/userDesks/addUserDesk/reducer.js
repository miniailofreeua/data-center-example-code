import { ADD_USER_DESK, ADD_USER_DESK_SUCCESS, API_ERROR } from './actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const CreateUserDesk = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DESK:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case ADD_USER_DESK_SUCCESS:
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

export default CreateUserDesk;
