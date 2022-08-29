import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Row, Col, Container, CardBody, Card } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { fakeLogin } from '../../store/actions';
import logolight from '../../assets/images/logo-light.png';

const FakeLogin = () => {
  const dispatch = useDispatch();

  const handleValidSubmit = (event, values) => {
    dispatch(fakeLogin(values));
  };

  useEffect(() => {
    document.body.className = 'authentication-bg';
    return function cleanup() {
      document.body.className = '';
    };
  });

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <span className="mb-5 d-block auth-logo">
                  <img
                    src={logolight}
                    alt=""
                    height="22"
                    className="logo logo-light"
                  />
                </span>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody className="p-4">
                  <div className="p-2 mt-4">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={handleValidSubmit}
                    >
                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value=""
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
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
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(connect(mapStateToProps, { fakeLogin })(FakeLogin));

FakeLogin.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};
