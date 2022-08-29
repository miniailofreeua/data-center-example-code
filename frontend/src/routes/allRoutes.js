import { Redirect } from 'react-router-dom';
// Fake pages
import DashboardFake from '../pages/_Template/Utility/pages-500';
import Register from '../pages/_Template/Utility/pages-404';
import FakeLogin from '../pages/Authentication/FakeLogin';
import NotFoundPage from '../pages/_Template/Utility/pages-404';
import Unreachable from '../pages/_Template/Utility/pages-500';

import Img1 from '../assets/images/hash/1.jpeg';
import Img2 from '../assets/images/hash/2.jpeg';
import Img3 from '../assets/images/hash/3.jpeg';
import Img4 from '../assets/images/hash/4.jpeg';
import Img5 from '../assets/images/hash/5.jpeg';
import Img6 from '../assets/images/hash/6.jpeg';
import Img7 from '../assets/images/hash/7.jpeg';
import Img8 from '../assets/images/hash/8.jpeg';
import Img9 from '../assets/images/hash/9.jpeg';
import Img10 from '../assets/images/hash/10.jpeg';

import UiNotifications from '../pages/_Template/Ui/ui-notifications';

//Login
import Login from '../pages/Authentication/Login';

//Traders
import TradersList from '../pages/CommonRole/Traders/TradersList';
import TradersProfileList from '../pages/CommonRole/TradersProfile/TradersProfileList';
import TradersImport from '../pages/Admin/TradersImport/TradersImport';

//Users
import UsersList from '../pages/CommonRole/Users/List/UsersList';
import AddUser from '../pages/CommonRole/Users/Add/AddUser';
import EditUser from '../pages/CommonRole/Users/Edit/EditUser';

//Brands
import BrandsList from '../pages/Admin/Brands/BrandsList';
import AddBrand from '../pages/Admin/Brands/Add/AddBrand';
import EditBrand from '../pages/Admin/Brands/Edit/EditBrand';

//Desks
import AddDesk from '../pages/Admin/Desks/Add/AddDesk';
import EditDesk from '../pages/Admin/Desks/Edit/EditDesk';
import DesksList from '../pages/Admin/Desks/DesksList';

import { prefix } from '../constants/path';
import { historyPush } from '../services/push';

const userRoutes = [
  {
    path: `${prefix}/ui-notifications`,
    component: UiNotifications,
  },

  {
    path: `${prefix}/`,
    exact: true,
    component: () => <Redirect to={`${prefix}/traders`} />,
  },
];

const adminRoutes = [
  {
    path: `${prefix}/traders`,
    component: TradersList,
  },
  {
    path: `${prefix}/traders/profile`,
    component: TradersProfileList,
  },
  {
    path: `${prefix}/traders/import`,
    component: TradersImport,
  },

  {
    path: `${prefix}/brands`,
    component: BrandsList,
  },
  {
    path: `${prefix}/brands/create`,
    component: AddBrand,
  },
  {
    path: `${prefix}/brands/edit`,
    component: EditBrand,
  },

  {
    path: `${prefix}/desks/create`,
    component: AddDesk,
  },
  {
    path: `${prefix}/desks/edit`,
    component: EditDesk,
  },
  { path: `${prefix}/desks`, component: DesksList },

  {
    path: `${prefix}/users`,
    component: UsersList,
  },
  {
    path: `${prefix}/users/create`,
    component: AddUser,
  },
  {
    path: `${prefix}/users/edit`,
    component: EditUser,
  },
];

const companyRoutes = [
  {
    path: `${prefix}/users`,
    component: UsersList,
  },
  {
    path: `${prefix}/users/create`,
    component: AddUser,
  },
  {
    path: `${prefix}/users/edit`,
    component: EditUser,
  },
  {
    path: `${prefix}/traders`,
    component: TradersList,
  },
];

const crmManagerRoutes = [
  {
    path: `${prefix}/users`,
    component: UsersList,
  },
  {
    path: `${prefix}/users/create`,
    component: AddUser,
  },
  {
    path: `${prefix}/users/edit`,
    component: EditUser,
  },
  {
    path: `${prefix}/traders`,
    component: TradersList,
  },
];

const deskManagerRoutes = [
  {
    path: `${prefix}/users`,
    component: UsersList,
  },
  {
    path: `${prefix}/users/create`,
    component: AddUser,
  },
  {
    path: `${prefix}/users/edit`,
    component: EditUser,
  },
  {
    path: `${prefix}/traders`,
    component: TradersList,
  },
];

const teamLeadRoutes = [
  {
    path: `${prefix}/users`,
    component: UsersList,
  },
  {
    path: `${prefix}/users/create`,
    component: AddUser,
  },
  {
    path: `${prefix}/users/edit`,
    component: EditUser,
  },
  {
    path: `${prefix}/traders`,
    component: TradersList,
  },
];

const authRoutes = [
  { path: `${prefix}/login`, component: Login },

  {
    path: `${prefix}/`,
    component: () => <>{historyPush(`/login`)}</>,
  },
];

const fakeRoutes = [{ path: `/login`, component: FakeLogin }];

const hashRoutes = [
  {
    path: `/dashboard`,
    component: DashboardFake,
  },

  { path: `/register`, component: Register },

  { path: `/admin`, component: Unreachable },

  {
    path: `/83dcefb7`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img1}
        alt="..."
      />
    ),
  },
  {
    path: `/1ad5be0d`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img2}
        alt="..."
      />
    ),
  },
  {
    path: `/6dd28e9b`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img3}
        alt="..."
      />
    ),
  },
  {
    path: `/f3b61b38`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img4}
        alt="..."
      />
    ),
  },
  {
    path: `/84b12bae`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img5}
        alt="..."
      />
    ),
  },
  {
    path: `/6abf4a82`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img6}
        alt="..."
      />
    ),
  },
  {
    path: `/fa005713`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img7}
        alt="..."
      />
    ),
  },
  {
    path: `/8d076785`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img8}
        alt="..."
      />
    ),
  },
  {
    path: `/a15d25e1`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img9}
        alt="..."
      />
    ),
  },

  {
    path: `/a15d25ff`,
    component: () => (
      <img
        style={{ width: '100vw', height: '100vh', margin: '0px auto' }}
        src={Img10}
        alt="..."
      />
    ),
  },
];

const notFoundPage = [{ path: '*', component: NotFoundPage }];

export {
  fakeRoutes,
  userRoutes,
  companyRoutes,
  crmManagerRoutes,
  deskManagerRoutes,
  teamLeadRoutes,
  authRoutes,
  adminRoutes,
  hashRoutes,
  notFoundPage,
};
