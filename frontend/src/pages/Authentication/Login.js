import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReCaptchaV2 from 'react-google-recaptcha';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Row, Col, Container, CardBody, Card, Spinner } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CustomLink from '../../components/Common/CustomLink';

import { loginUser } from '../../store/actions';
import { historyPush } from '../../services/push';

import { REACT_APP_SITE_KEY } from '../../constants/env';

import styles from './styles.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Login);

  const handleValidSubmit = (event, values) => {
    dispatch(loginUser(values, recaptchaToken));
  };

  const accessToken = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (accessToken && userRole) {
      historyPush('traders');
    }
    return function cleanup() {
      document.body.className = '';
    };
  }, [accessToken, userRole]);

  useEffect(() => {
    document.body.className = 'authentication-bg';
    return function cleanup() {
      document.body.className = '';
    };
  }, []);
  const [recaptchaToken, setRecaptchaToken] = useState();

  const handleToken = setRecaptchaToken;

  return (
    <>
      {userRole && (
        <div className="home-btn d-none d-sm-block">
          <CustomLink to="/traders" className="text-dark">
            <i className="mdi mdi-home-variant h2"></i>
          </CustomLink>
        </div>
      )}

      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back!</h5>
                  </div>
                  <div className="p-2 mt-4">
                    <AvForm
                      className={classNames(
                        'form-horizontal',
                        styles.loginForm,
                      )}
                      onValidSubmit={handleValidSubmit}
                    >
                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="Username"
                          value=""
                          className="form-control"
                          placeholder="Enter username"
                          type="string"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          value=""
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="mt-3">
                        <ReCaptchaV2
                          sitekey={REACT_APP_SITE_KEY}
                          onChange={handleToken}
                        />
                        {loading ? (
                          <div
                            className={classNames(
                              'btn btn-primary w-100 waves-effect waves-light',
                              styles.submitBtn,
                            )}
                            style={{ height: '55px' }}
                          >
                            <Spinner className="spinner m-1" color="light" />
                          </div>
                        ) : (
                          <>
                            <button
                              className={classNames(
                                'btn btn-primary w-100 waves-effect waves-light',
                                styles.submitBtn,
                              )}
                              style={{ height: '55px' }}
                              type="submit"
                            >
                              <div className="m-1">Log in</div>
                            </button>
                          </>
                        )}
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(connect(mapStateToProps, { loginUser })(Login));

Login.propTypes = {
  error: PropTypes.any,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};
