import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_DESKS } from './actionTypes';
import { apiError, getDesksSuccess } from './actions';

import { getDesksRequest } from '../../../API/Desks';

function* GetDesks() {
  try {
    const payload = yield call(getDesksRequest);
    yield put(getDesksSuccess(payload));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetDesksSaga() {
  yield takeEvery(GET_DESKS, GetDesks);
}

export default GetDesksSaga;
