import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_BRAND } from './actionTypes';
import { apiError, getBrandSuccess } from './actions';
import { getBrandRequest } from '../../../API/Brands';

function* GetBrand(action) {
  try {
    const brand = yield call(getBrandRequest, action.payload);
    yield put(getBrandSuccess(brand));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetBrandSaga() {
  yield takeEvery(GET_BRAND, GetBrand);
}

export default GetBrandSaga;
