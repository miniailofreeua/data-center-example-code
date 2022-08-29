import { call, put, takeLatest } from 'redux-saga/effects';
import { Traders } from '../../../API/api';
import * as actions from './TradersImportActions';

function* tradersImport(action) {
  try {
    const data = yield call(
      Traders.tradersImportParse,
      action.payload,
      action.brandId,
    );
    yield put({ type: actions.TRADERS_IMPORT_PARSE_SUCCESS, payload: data });
    action.goToNextStep();
  } catch (e) {
    console.error(e);
    yield put({
      type: actions.TRADERS_IMPORT_PARSE_FAILURE,
      error: e.response.data,
    });
  }
}

function* tradersUpload(action) {
  yield put({ type: actions.TRADERS_IMPORT_UPLOAD_REQUEST });
  try {
    const data = yield call(Traders.tradersImportUpload, action.payload);
    yield put({ type: actions.TRADERS_IMPORT_UPLOAD_SUCCESS, payload: data });
  } catch (e) {
    yield put({
      type: actions.TRADERS_IMPORT_UPLOAD_FAILURE,
      error: e.response.data,
    });
  }
}

export default function* tradersImportSaga() {
  yield takeLatest(actions.TRADERS_IMPORT_PARSE, tradersImport);
  yield takeLatest(actions.TRADERS_IMPORT_UPLOAD, tradersUpload);
}
