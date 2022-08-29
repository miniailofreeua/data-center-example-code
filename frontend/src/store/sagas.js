import { all, fork } from 'redux-saga/effects';

// layout
import LayoutSaga from './layout/saga';

// auth
import AuthSaga from './auth/login/saga';
import FakeAuthSaga from './auth/fakeLogin/saga';

// brand
import GetBrandsSaga from './brand/getBrands/saga';
import GetBrandSaga from './brand/getBrand/saga';
import UpdateBrandSaga from './brand/updateBrand/saga';
import CreateBrandSaga from './brand/createBrand/saga';

// users
import GetUsersSaga from './users/getUsers/saga';
import GetCurrentUserSaga from './users/getCurrentUser/saga';
import GetUserSaga from './users/getUser/saga';
import CreateUserSaga from './users/createUser/saga';
import UpdateUserSaga from './users/updateUser/saga';
//userDesk
import AddUserDeskSaga from './userDesks/addUserDesk/saga';
import DeleteUserDeskSaga from './userDesks/deleteUserDesk/saga';

//desks
import GetDesksSaga from './desk/getDesks/saga';
import CreateDeskSaga from './desk/createDesk/saga';
import GetDeskSaga from './desk/getDesk/saga';
import UpdateDeskSaga from './desk/updateDesk/saga';

//traders
import GetTradersSaga from './traders/getTraders/saga';
import GetTradersProfileSaga from './traders/getTradersProfile/saga';
import TradersImportSaga from './traders/import/TradersImportSaga';
import CreateCustomFieldsSaga from './traders/import/customFields/saveCustomFields/saga';
import GetCustomFieldsSaga from './traders/import/customFields/getCustomFields/saga';
import UpdateTraderToBrandsSaga from './traders/updateTraderToBrands/saga';

export default function* rootSaga() {
  yield all([
    //auth
    fork(AuthSaga),
    fork(FakeAuthSaga),

    //user
    fork(CreateUserSaga),
    fork(GetCurrentUserSaga),
    fork(GetUsersSaga),
    fork(GetUserSaga),
    fork(UpdateUserSaga),
    fork(AddUserDeskSaga),
    fork(DeleteUserDeskSaga),

    //desks
    fork(GetDesksSaga),
    fork(CreateDeskSaga),
    fork(GetDeskSaga),
    fork(UpdateDeskSaga),

    //brand
    fork(CreateBrandSaga),
    fork(GetBrandsSaga),
    fork(GetBrandSaga),
    fork(UpdateBrandSaga),

    //traders
    fork(GetTradersSaga),
    fork(GetTradersProfileSaga),
    fork(TradersImportSaga),
    fork(CreateCustomFieldsSaga),
    fork(GetCustomFieldsSaga),
    fork(UpdateTraderToBrandsSaga),

    //layout
    fork(LayoutSaga),
  ]);
}
