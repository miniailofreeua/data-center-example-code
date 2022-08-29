import { call, put, takeEvery } from 'redux-saga/effects';

import { UPDATE_BRAND } from './actionTypes';
import { apiError, updateBrandSuccess } from './actions';

import { updateBrandRequest } from '../../../API/Brands';
import { toastSuccess } from '../../../services/notifications';
import { historyPush } from '../../../services/push';

function* UpdateBrand({ brandId, payload }) {
  try {
    const response = yield call(updateBrandRequest, brandId, payload);

    yield put(updateBrandSuccess(response));

    toastSuccess({ message: 'Brand updated successfully' });

    historyPush('/brands');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* UpdateBrandSaga() {
  yield takeEvery(UPDATE_BRAND, UpdateBrand);
}

export default UpdateBrandSaga;
