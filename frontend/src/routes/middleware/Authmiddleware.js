import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { prefix } from '../../constants/path';

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  path,
  exact,
}) => {
  useEffect(() => {
    const isSecretPath = window.location.pathname.includes(prefix);
    const isLoginPage = window.location.pathname.includes(`${prefix}/login`);

    if (isSecretPath && !isLoginPage && !localStorage.getItem('accessToken')) {
      window.location.replace(`${prefix}/login`);
    }
  });

  return (
    <Route
      path={`${path}`}
      exact={exact}
      render={(props) => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};
export default Authmiddleware;
