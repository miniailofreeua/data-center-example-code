import { call, put, takeEvery } from 'redux-saga/effects';

import { CREATE_BRAND } from './actionTypes';
import { apiError, createBrandSuccess } from './actions';

import { createBrandRequest } from '../../../API/Brands';
import { toastSuccess } from '../../../services/notifications';
import { historyPush } from '../../../services/push';

function* CreateBrand({ payload }) {
  try {
    const response = yield call(createBrandRequest, payload);

    yield put(createBrandSuccess(response));

    toastSuccess({ message: 'Brand created successfully' });

    historyPush('/brands');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* CreateBrandSaga() {
  yield takeEvery(CREATE_BRAND, CreateBrand);
}

export default CreateBrandSaga;
