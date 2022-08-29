import { FAKE_LOGIN_USER, API_ERROR } from './actionTypes';

const initialState = {
  error: null,
  loading: false,
};

const fakeLogin = (state = initialState, action) => {
  switch (action.type) {
    case FAKE_LOGIN_USER:
      state = {
        ...state,
        loading: true,
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

export default fakeLogin;
