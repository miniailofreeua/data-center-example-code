import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { UserRole } from './enums/UserRole.enum';

// Import Routes all
import {
  authRoutes,
  adminRoutes,
  fakeRoutes,
  hashRoutes,
  notFoundPage,
  userRoutes,
  companyRoutes,
  crmManagerRoutes,
  deskManagerRoutes,
  teamLeadRoutes,
} from './routes/allRoutes';

// Import all middleware
import Authmiddleware from './routes/middleware/Authmiddleware';

//Modals
import { ModalContainer } from './components/Modal/ModalsWrapper';

// layouts Format
import HorizontalLayout from './components/HorizontalLayout';
import NonAuthLayout from './components/Layouts/NonAuthLayout';

import './App.scss';

const App = (props) => {
  const { match } = props;

  const userRole = localStorage.getItem('userRole');

  function getLayout() {
    let layoutCls = HorizontalLayout;

    return layoutCls;
  }

  const Layout = getLayout();

  return (
    <React.Fragment>
      <ConnectedRouter history={props.history}>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              match={match}
              exact
            />
          ))}

          {fakeRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              match={match}
              exact
            />
          ))}

          {[UserRole.Admin, UserRole.SuperManager].includes(userRole) &&
            adminRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                match={match}
                exact
              />
            ))}

          {userRole === UserRole.Company &&
            companyRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                match={match}
                exact
              />
            ))}

          {userRole === UserRole.CrmManager &&
            crmManagerRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                match={match}
                exact
              />
            ))}

          {userRole === UserRole.DeskManager &&
            deskManagerRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                match={match}
                exact
              />
            ))}

          {userRole === UserRole.TeamLead &&
            teamLeadRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                match={match}
                exact
              />
            ))}

          {hashRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              match={match}
              exact
            />
          ))}

          {notFoundPage.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              match={match}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              match={match}
              exact
            />
          ))}
        </Switch>
      </ConnectedRouter>
      <ModalContainer />
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
