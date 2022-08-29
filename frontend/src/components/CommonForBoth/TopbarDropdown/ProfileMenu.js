import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { logoutUser } from '../../../store/actions';
import { withTranslation } from 'react-i18next';

const ProfileMenu = ({ user }) => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false);

  function handleLogout() {
    dispatch(logoutUser('/login'));
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <span>Hi,</span>
          <span className="d-xl-inline-block ms-1 fw-medium font-size-15">
            {user?.username}
          </span>
          <i className="uil-angle-down d-xl-inline-block font-size-15"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-right header-dropdown">
          <Link
            to="/login"
            className="dropdown-item"
            onClick={() => handleLogout()}
          >
            <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStateToProps = (state, props) => {
  const { error, success } = state.Profile;

  const { user } = props;

  return { error, success, user };
};

export default withRouter(
  connect(mapStateToProps, {})(withTranslation()(ProfileMenu)),
);
