import { call, put, takeEvery } from 'redux-saga/effects';

import { ADD_USER_DESK } from './actionTypes';
import { apiError, addUserDeskSuccess } from './actions';
import { toastSuccess } from '../../../services/notifications';
import { createUserDeskRequest } from '../../../API/UserDesks';
import { getUserSuccess } from '../../actions';
import { getUserRequest } from '../../../API/Users';

function* AddUserDesk({ payload }) {
  try {
    const response = yield call(createUserDeskRequest, payload);
    const user = yield call(getUserRequest, payload.userId);

    toastSuccess({
      message: `User desk created successfully`,
    });
    yield put(addUserDeskSuccess(response));
    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* CreateDeskSaga() {
  yield takeEvery(ADD_USER_DESK, AddUserDesk);
}

export default CreateDeskSaga;
