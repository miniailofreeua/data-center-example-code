import {
  GET_TRADER_PROFILE,
  GET_TRADER_SUCCESS_PROFILE,
  API_ERROR,
  CLEAR_GET_TRADER_PROFILE_STATE,
} from './actionTypes';

const initialState = {
  traderId: null,
  profiles: [],
  trader: {},
  credentials: [],
  error: '',
  loading: false,
};

const GetTradersProfile = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_GET_TRADER_PROFILE_STATE:
      state = {
        ...initialState,
      };
      break;
    case GET_TRADER_PROFILE:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_TRADER_SUCCESS_PROFILE:
      state = {
        ...state,
        profiles: action.payload.profiles,
        credentials: action.payload.credentials,
        trader: action.payload.trader,
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

export default GetTradersProfile;
