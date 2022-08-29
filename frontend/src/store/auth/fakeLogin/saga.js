import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FAKE_LOGIN_USER } from './actionTypes';
import { apiError } from './actions';

//Include Both Helper File with needed methods
import { fakeLoginUser } from '../../../API/Auth';

function* fakeLogin({ payload: { user } }) {
  try {
    const payload = {
      username: user.username,
      password: user.password,
    };
    yield call(fakeLoginUser, { payload });
  } catch (error) {
    yield put(apiError(error));
  }
}

function* fakeUserSaga() {
  yield takeEvery(FAKE_LOGIN_USER, fakeLogin);
}

export default fakeUserSaga;
