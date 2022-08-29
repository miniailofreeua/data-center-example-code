import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_CUSTOM_FIELDS } from './actionTypes';
import { apiError, getCustomFieldsSuccess } from './actions';
import { getCustomFieldsRequest } from '../../../../../API/Traders';

function* GetCustomFields(action) {
  try {
    const fields = yield call(getCustomFieldsRequest, action.payload);
    yield put(getCustomFieldsSuccess(fields));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetCustomFieldsSaga() {
  yield takeEvery(GET_CUSTOM_FIELDS, GetCustomFields);
}

export default GetCustomFieldsSaga;
