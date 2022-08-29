import { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import { Spinner } from 'reactstrap';

import './RoleManager.css';
import { NotFoundLayout } from '../../components';
import { getCurrentUser, logoutUser } from '../../store/actions';

const RoleManager = (WrappedComponent, access) => {
  class RoleManager extends Component {
    componentDidMount() {
      const { dispatch, user } = this.props;

      if (access && !user) {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          dispatch(getCurrentUser());
        } else {
          dispatch(logoutUser());
        }
      }
    }

    checkAccess = () => {
      const { user } = this.props;

      if (!user) {
        return false;
      }
      const userRole = localStorage.getItem('userRole');

      if (access) {
        const hasRoles = _.includes(access, userRole);

        if (hasRoles) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    };

    renderSpinner = () => {
      return (
        <div className="w-100 text-center">
          <Spinner className="m-1" color="primary" />
        </div>
      );
    };

    renderView = () => {
      const { loading, user, wrappedComponentProps } = this.props;
      const spinner = this.renderSpinner();

      if (!access) {
        return <WrappedComponent {...wrappedComponentProps} />;
      }

      if (user) {
        const isAllowedByRole = this.checkAccess();

        if (isAllowedByRole) {
          return <WrappedComponent {...wrappedComponentProps} />;
        } else {
          return <NotFoundLayout />;
        }
      } else {
        if (loading) {
          return spinner;
        } else {
          return <NotFoundLayout />;
        }
      }
    };

    render() {
      const accessibleView = this.renderView();

      return <div>{accessibleView}</div>;
    }
  }

  function mapStateToProps(state, wrappedComponentProps) {
    const { user, loading } = state.GetCurrentUser;

    return {
      user,
      loading,
      wrappedComponentProps,
    };
  }

  return connect(mapStateToProps)(RoleManager);
};

export default RoleManager;
