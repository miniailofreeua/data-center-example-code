import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { apiError, loginSuccess, logoutUserSuccess } from './actions';

//Include Both Helper File with needed methods
import { loginUser } from '../../../API/Auth';
import { prefix } from '../../../constants/path';
import { UserRole } from '../../../enums';

function* loginUserSaga({ payload: { user }, recaptchaToken }) {
  try {
    const payload = {
      username: user.username,
      password: user.password,
    };
    const options = {
      recaptchaToken,
    };
    const response = yield call(loginUser, {
      payload,
      options,
    });

    yield put(loginSuccess(response));

    window.localStorage.setItem('accessToken', response.access_token);
    window.localStorage.setItem('userRole', response.user.role);

    const userRole = localStorage.getItem('userRole');

    if (userRole === UserRole.Admin) {
      window.location.replace(`${prefix}/traders`);
    }

    if (userRole && userRole !== UserRole.Admin) {
      window.location.replace(`${prefix}/users`);
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');

    yield put(logoutUserSuccess());

    window.location.replace(`${prefix}/login`);
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUserSaga);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
