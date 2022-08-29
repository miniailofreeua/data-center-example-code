import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';

// layout
import Layout from './layout/reducer';

// auth
import Login from './auth/login/reducer';
import FakeLogin from './auth/fakeLogin/reducer';
import Profile from './auth/profile/reducer';

// brand
import GetBrands from './brand/getBrands/reducer';
import CreateBrand from './brand/createBrand/reducer';
import UpdateBrand from './brand/updateBrand/reducer';
import GetBrand from './brand/getBrand/reducer';

// Desks
import GetDesks from './desk/getDesks/reducer';
import CreateDesk from './desk/createDesk/reducer';
import UpdateDesk from './desk/updateDesk/reducer';
import GetDesk from './desk/getDesk/reducer';

//Users
import GetUsers from './users/getUsers/reducer';
import GetCurrentUser from './users/getCurrentUser/reducer';
import CreateUser from './users/createUser/reducer';
import GetUser from './users/getUser/reducer';
import UpdateUser from './users/updateUser/reducer';
import DeleteUserDesk from './userDesks/deleteUserDesk/reducer';
import AddUserDesk from './userDesks/addUserDesk/reducer';

//traders
import GetTraders from './traders/getTraders/reducer';
import GetTradersProfile from './traders/getTradersProfile/reducer';
import TradersImport from './traders/import/TradersImportReducer';
import UpdateTraderToBrands from './traders/updateTraderToBrands/reducer';

//import custom fields
import CreateCustomFields from './traders/import/customFields/saveCustomFields/reducer';
import GetCustomFields from './traders/import/customFields/getCustomFields/reducer';

//Modals
import modals from '../components/Modal/reducer';

const rootReducer = combineReducers({
  router: connectRouter(history),

  //auth
  Login,
  FakeLogin,

  //user
  CreateUser,
  UpdateUser,
  GetCurrentUser,
  GetUser,
  GetUsers,
  DeleteUserDesk,
  AddUserDesk,

  //brand
  CreateBrand,
  UpdateBrand,
  GetBrand,
  GetBrands,

  //desks
  GetDesks,
  CreateDesk,
  UpdateDesk,
  GetDesk,

  //traders
  GetTraders,
  GetTradersProfile,
  TradersImport,
  CreateCustomFields,
  GetCustomFields,
  UpdateTraderToBrands,

  //layout
  Layout,
  Profile,
  modals,
});

export default rootReducer;
