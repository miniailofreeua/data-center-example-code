import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_TRADERS } from './actionTypes';
import { apiError, getTradersSuccess } from './actions';

import { getTradersRequest } from '../../../API/Traders';

function* GetTraders({ options }) {
  try {
    const { list, count } = yield call(getTradersRequest, options);

    yield put(getTradersSuccess({ list, count }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetTradersSaga() {
  yield takeEvery(GET_TRADERS, GetTraders);
}

export default GetTradersSaga;
