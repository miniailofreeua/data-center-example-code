import { call, put, takeEvery } from 'redux-saga/effects';

import { CREATE_DESK } from './actionTypes';
import { apiError, createDeskSuccess } from './actions';

import { createDeskRequest } from '../../../API/Desks';

import { toastSuccess } from '../../../services/notifications';
import { historyPush } from '../../../services/push';

function* CreateDesk({ payload }) {
  try {
    const response = yield call(createDeskRequest, payload);

    toastSuccess({ message: 'Desk created successfully' });

    yield put(createDeskSuccess(response));

    historyPush('/desks');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* CreateDeskSaga() {
  yield takeEvery(CREATE_DESK, CreateDesk);
}

export default CreateDeskSaga;
