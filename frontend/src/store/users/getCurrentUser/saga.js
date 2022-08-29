import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_CURRENT_USER } from './actionTypes';
import { apiError, getCurrentUserSuccess } from './actions';
import { getCurrentUserRequest } from '../../../API/Users';

function* GetCurrentUser() {
  try {
    const currentUser = yield call(getCurrentUserRequest);
    yield put(getCurrentUserSuccess(currentUser));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetCurrentUserSaga() {
  yield takeEvery(GET_CURRENT_USER, GetCurrentUser);
}

export default GetCurrentUserSaga;
