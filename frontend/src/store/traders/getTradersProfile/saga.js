import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_TRADER_PROFILE } from './actionTypes';
import { apiError, getTraderSuccessProfile } from './actions';

import { getTradersProfileRequest } from '../../../API/Traders';

function* GetTraderProfile(payload) {
  try {
    const { traderToBrandsProfiles, traderCredentials, trader } = yield call(
      getTradersProfileRequest,
      payload,
    );

    yield put(
      getTraderSuccessProfile({
        profiles: traderToBrandsProfiles,
        credentials: traderCredentials,
        trader: trader,
      }),
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* GetTraderProfileSaga() {
  yield takeEvery(GET_TRADER_PROFILE, GetTraderProfile);
}

export default GetTraderProfileSaga;
