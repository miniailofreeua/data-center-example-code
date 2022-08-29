import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showRightSidebarAction, toggleLeftmenu } from '../../store/actions';

import logo from '../../assets/images/logo-sm.png';
import CustomLink from '../Common/CustomLink';
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';

import './styles.scss';

const Header = (props) => {
  const { user } = props;

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT,
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  return (
    <>
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <CustomLink to="/traders" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logo} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logo} alt="" height="17" />
              </span>
            </CustomLink>

            <CustomLink to="/traders" className="logo logo-light">
              <span className="logo-sm">
                <img src={logo} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logo} alt="" height="19" />
                <span className="logo-title">Data-Center</span>
              </span>
            </CustomLink>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
          style={{ marginRight: 'auto' }}
          data-toggle="collapse"
          onClick={() => {
            props.toggleLeftmenu(!props.leftMenu);
          }}
          data-target="#topnav-menu-content"
        >
          <i className="fa fa-fw fa-bars" />
        </button>

        <div className="d-flex">
          <div className="dropdown d-none d-lg-inline-block ms-1">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect"
              onClick={() => {
                toggleFullscreen();
              }}
              data-toggle="fullscreen"
            >
              <i className="uil-minus-path"></i>
            </button>
          </div>

          <ProfileMenu user={user} />
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;

  const { user } = state.GetCurrentUser;

  return { layoutType, showRightSidebar, leftMenu, user };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(Header);
