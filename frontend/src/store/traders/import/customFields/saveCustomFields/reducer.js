import {
  CREATE_CUSTOM_FIELDS,
  CREATE_CUSTOM_FIELDS_SUCCESS,
  API_ERROR,
} from './actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const CreateUser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CUSTOM_FIELDS:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case CREATE_CUSTOM_FIELDS_SUCCESS:
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

export default CreateUser;
