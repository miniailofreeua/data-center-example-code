import {
  GET_CUSTOM_FIELDS,
  GET_CUSTOM_FIELDS_SUCCESS,
  API_ERROR,
  CLEAR_GET_CUSTOM_FIELDS_STATE,
} from './actionTypes';

const initialState = {
  fields: [{}],
  error: null,
  loading: false,
};

const GetCustomFields = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GET_CUSTOM_FIELDS_STATE:
      state = {
        ...initialState,
      };
      break;
    case GET_CUSTOM_FIELDS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_CUSTOM_FIELDS_SUCCESS:
      state = {
        ...state,
        fields: action.payload,
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

export default GetCustomFields;
