import { call, put, takeEvery } from 'redux-saga/effects';

import { DELETE_USER_DESK } from './actionTypes';
import { apiError } from './actions';
import { toastSuccess } from '../../../services/notifications';
import { deleteUserDeskRequest } from '../../../API/UserDesks';
import { getUserRequest } from '../../../API/Users';
import { getUserSuccess } from '../../actions';

function* UpdateUser(action) {
  try {
    yield call(deleteUserDeskRequest, action.id);
    const user = yield call(getUserRequest, action.userId);

    toastSuccess({ message: 'User was updated' });

    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* UpdateUserSaga() {
  yield takeEvery(DELETE_USER_DESK, UpdateUser);
}

export default UpdateUserSaga;
