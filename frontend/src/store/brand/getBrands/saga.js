import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_BRANDS } from './actionTypes';
import { apiError, getBrandsSuccess } from './actions';

import { getBrandsRequest } from '../../../API/Brands';

function* GetBrands() {
  try {
    const payload = yield call(getBrandsRequest);
    yield put(getBrandsSuccess(payload));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetBrandsSaga() {
  yield takeEvery(GET_BRANDS, GetBrands);
}

export default GetBrandsSaga;
