import React from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

//i18n
import { withTranslation } from 'react-i18next';

import CustomLink from '../Common/CustomLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAsterisk,
  faDollarSign,
  faUserCircle,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';

import './styles.scss';
import { UserRole } from '../../enums';

const userRole = localStorage.getItem('userRole');

const Navbar = (props) => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="topnav">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              {[UserRole.Admin, UserRole.SuperManager].includes(userRole) && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/traders">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>

                      <span>Traders</span>
                    </CustomLink>
                  </li>

                  {UserRole.Admin === userRole && (
                    <li className="nav-item">
                      <CustomLink
                        className="nav-link waves-effect"
                        to="/brands"
                      >
                        <i className="navbar-icon">
                          <FontAwesomeIcon
                            icon={faAsterisk}
                            color="inherit"
                            cursor="pointer"
                          />
                        </i>
                        <span>Brands</span>
                      </CustomLink>
                    </li>
                  )}

                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/desks">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faWindowMaximize}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>
                      <span>Desks</span>
                    </CustomLink>
                  </li>

                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/users">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>

                      <span>Users</span>
                    </CustomLink>
                  </li>
                </ul>
              )}

              {userRole === UserRole.Company && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/traders">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>

                      <span>Traders</span>
                    </CustomLink>
                  </li>
                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/users">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>
                      <span>Users</span>
                    </CustomLink>
                  </li>
                </ul>
              )}

              {userRole === UserRole.CrmManager && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/traders">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>

                      <span>Traders</span>
                    </CustomLink>
                  </li>
                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/users">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>
                      <span>Users</span>
                    </CustomLink>
                  </li>
                </ul>
              )}

              {userRole === UserRole.DeskManager && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/traders">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>

                      <span>Traders</span>
                    </CustomLink>
                  </li>
                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/users">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>
                      <span>Users</span>
                    </CustomLink>
                  </li>
                </ul>
              )}

              {userRole === UserRole.TeamLead && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/traders">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>

                      <span>Traders</span>
                    </CustomLink>
                  </li>
                  <li className="nav-item">
                    <CustomLink className="nav-link waves-effect" to="/users">
                      <i className="navbar-icon">
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          color="inherit"
                          cursor="pointer"
                        />
                      </i>
                      <span>Users</span>
                    </CustomLink>
                  </li>
                </ul>
              )}
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar)),
);
