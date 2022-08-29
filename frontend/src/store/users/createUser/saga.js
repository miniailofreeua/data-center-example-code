import { call, put, takeEvery } from 'redux-saga/effects';

import { CREATE_USER } from './actionTypes';
import { apiError, createUserSuccess } from './actions';
import { historyPush } from '../../../services/push';

import { createUserRequest } from '../../../API/Users';

import { toastSuccess } from '../../../services/notifications';
import { UserRoleLabel } from '../../../enums/UserRole.enum';

function* CreateUser({ payload }) {
  try {
    const response = yield call(createUserRequest, payload);

    toastSuccess({
      message: `${UserRoleLabel[payload.role]} created successfully`,
    });

    yield put(createUserSuccess(response));

    historyPush('users');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* CreateDeskSaga() {
  yield takeEvery(CREATE_USER, CreateUser);
}

export default CreateDeskSaga;
