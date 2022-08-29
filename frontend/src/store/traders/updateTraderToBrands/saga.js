import { call, put, takeEvery } from 'redux-saga/effects';

import { UPDATE_TRADER_TO_BRANDS } from './actionTypes';
import { apiError, updateTraderToBrandsSuccess } from './actions';
import { updateTraderToBrandsRequest } from '../../../API/Traders';
import { toastSuccess } from '../../../services/notifications';
import { historyPush } from '../../../services/push';

function* UpdateTraderToBrands(action) {
  try {
    const { traderId, payload } = action;
    yield call(updateTraderToBrandsRequest, traderId, payload);

    toastSuccess({ message: 'Trader was updated' });

    yield put(updateTraderToBrandsSuccess());

    historyPush('traders');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* UpdateTraderToBrandsSaga() {
  yield takeEvery(UPDATE_TRADER_TO_BRANDS, UpdateTraderToBrands);
}

export default UpdateTraderToBrandsSaga;
