import { UPDATE_BRAND, UPDATE_BRAND_SUCCESS, API_ERROR } from './actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const UpdateBrand = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BRAND:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case UPDATE_BRAND_SUCCESS:
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

export default UpdateBrand;
