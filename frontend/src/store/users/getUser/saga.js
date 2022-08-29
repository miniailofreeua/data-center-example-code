import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_USER } from './actionTypes';
import { apiError, getUserSuccess } from './actions';
import { getUserRequest } from '../../../API/Users';

function* GetUser(action) {
  try {
    const user = yield call(getUserRequest, action.payload);
    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetUserSaga() {
  yield takeEvery(GET_USER, GetUser);
}

export default GetUserSaga;
