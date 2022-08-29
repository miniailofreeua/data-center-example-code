import { call, put, takeEvery } from 'redux-saga/effects';

import { UPDATE_USER } from './actionTypes';
import { apiError, updateUserSuccess } from './actions';
import { updateUserRequest } from '../../../API/Users';
import { toastSuccess } from '../../../services/notifications';
import { historyPush } from '../../../services/push';

function* UpdateUser(action) {
  try {
    const { isCascadeUpdateAllowed, userId, payload } = action;
    const user = yield call(updateUserRequest, userId, payload, {
      isCascadeUpdateAllowed,
    });

    toastSuccess({ message: 'User was updated' });

    yield put(updateUserSuccess({ current: user }));

    historyPush('users');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* UpdateUserSaga() {
  yield takeEvery(UPDATE_USER, UpdateUser);
}

export default UpdateUserSaga;
