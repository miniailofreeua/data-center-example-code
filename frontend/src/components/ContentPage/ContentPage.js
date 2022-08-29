import React from 'react';
import PropTypes from 'prop-types';
import CustomLink from '../Common/CustomLink';
import classNames from 'classnames';
import styles from './styles.module.scss';

const ContentPage = (props) => {
  const renderLinkCrumb = ({ link, text }, index) => {
    return (
      <li key={`${text}-${index}`}>
        <CustomLink to={link}>{text}</CustomLink>
      </li>
    );
  };

  const renderActiveCrumb = (crumb, index) => {
    return (
      <li key={crumb.text + index} className="active">
        {crumb.text}
      </li>
    );
  };

  const renderBreadCrumbs = () => {
    const { breadcrumbs = [] } = props;

    return breadcrumbs.map((crumb, index) => {
      if (!crumb.link) {
        return renderActiveCrumb(crumb, index);
      }

      return renderLinkCrumb(crumb, index);
    });
  };

  const renderActions = (actions) => {
    return actions.map(({ fetching, name, link, onClick, disabled }, i) => {
      if (onClick) {
        return (
          <div>
            <button
              key={`page-action-button-${i}`}
              className={`btn btn-${disabled ? 'secondary' : 'success'}`}
              onClick={onClick}
              disabled={disabled}
              type="button"
            >
              {fetching && (
                <span id="loadingPulse" className="loading-pulse mr-1" />
              )}
              {name}
            </button>
          </div>
        );
      }
      return (
        <div>
          <CustomLink to={link} className="btn btn-success">
            {name}
          </CustomLink>
        </div>
      );
    });
  };

  const { pageName, children, hideBreadcrumbs, actions } = props;

  return (
    <main id="content" className="content">
      <div className="flex-sb flex-wrap">
        <div>
          {hideBreadcrumbs ? null : (
            <ol className="breadcrumb m-0">
              <>
                <li>
                  <CustomLink to={'/traders'}>Home</CustomLink>
                </li>
                {renderBreadCrumbs()}
              </>
            </ol>
          )}
        </div>
        {actions && (
          <div className="d-flex flex-wrap">
            {actions.map(({ component }, i) => (
              <div key={i}>{component}</div>
            ))}
          </div>
        )}
      </div>
      <header className="d-flex justify-content-between py-2">
        <h2>{pageName}</h2>
        <div className={classNames('d-flex flex-wrap', styles.actions)}>
          {renderActions(actions)}
        </div>
      </header>
      {children}
    </main>
  );
};

ContentPage.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      route: PropTypes.string,
      type: PropTypes.string,
      onClick: PropTypes.func,
      component: PropTypes.object,
      disabled: PropTypes.bool,
    }),
  ),
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      link: PropTypes.string,
    }),
  ),
  hideBreadcrumbs: PropTypes.bool,
  children: PropTypes.any,
  homeRoute: PropTypes.string,
  isAdmin: PropTypes.bool,
  pageName: PropTypes.string,
  CustomHeader: PropTypes.node,
};

ContentPage.defaultProps = {
  actions: [],
  breadcrumbs: [],
  homeRoute: '/',
  isAdmin: false,
  pageName: 'Page',
};

export default ContentPage;
