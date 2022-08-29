import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_USERS } from './actionTypes';
import { apiError, getUsersSuccess } from './actions';
import { getUsersRequest } from '../../../API/Users';

function* GetUsers({ options }) {
  try {
    const { list, count } = yield call(getUsersRequest, options);
    yield put(getUsersSuccess({ list, count }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetUsersSaga() {
  yield takeEvery(GET_USERS, GetUsers);
}

export default GetUsersSaga;
