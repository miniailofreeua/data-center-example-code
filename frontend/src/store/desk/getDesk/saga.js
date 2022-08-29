import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_DESK } from './actionTypes';
import { apiError, getDeskSuccess } from './actions';
import { getDeskRequest } from '../../../API/Desks';

function* GetDesk(action) {
  try {
    const desk = yield call(getDeskRequest, action.payload);
    yield put(getDeskSuccess(desk));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetDeskSaga() {
  yield takeEvery(GET_DESK, GetDesk);
}

export default GetDeskSaga;
