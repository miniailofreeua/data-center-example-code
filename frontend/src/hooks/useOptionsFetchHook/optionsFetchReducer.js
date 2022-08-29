import {
  FETCH_REQUEST,
  FETCH_REQUEST_FAILURE,
  FETCH_REQUEST_SUCCESS,
} from './actions';

const optionsFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        options: action.payload,
      };
    case FETCH_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
export default optionsFetchReducer;
