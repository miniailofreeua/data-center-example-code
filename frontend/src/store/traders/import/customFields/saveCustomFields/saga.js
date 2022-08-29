import { call, put, takeEvery } from 'redux-saga/effects';

import { CREATE_CUSTOM_FIELDS } from './actionTypes';
import { apiError, createCustomFieldsSuccess } from './actions';

import { createCustomFieldsRequest } from '../../../../../API/Traders';

import { toastSuccess } from '../../../../../services/notifications';

function* CreateCustomFields({ payload }) {
  try {
    const response = yield call(createCustomFieldsRequest, payload);

    toastSuccess({
      message: `Fields saved successfully`,
    });

    yield put(createCustomFieldsSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* CreateCustomFieldsSaga() {
  yield takeEvery(CREATE_CUSTOM_FIELDS, CreateCustomFields);
}

export default CreateCustomFieldsSaga;
