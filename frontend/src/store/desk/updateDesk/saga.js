import { call, put, takeEvery } from 'redux-saga/effects';

import { UPDATE_DESK } from './actionTypes';
import { apiError, updateDeskSuccess } from './actions';

import { updateDeskRequest } from '../../../API/Desks';
import { toastSuccess } from '../../../services/notifications';
import { historyPush } from '../../../services/push';

function* UpdateDesk({ deskId, payload }) {
  try {
    const response = yield call(updateDeskRequest, deskId, payload);

    yield put(updateDeskSuccess(response));

    toastSuccess({ message: 'Desk updated successfully' });

    historyPush('/desks');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* UpdateDeskSaga() {
  yield takeEvery(UPDATE_DESK, UpdateDesk);
}

export default UpdateDeskSaga;
