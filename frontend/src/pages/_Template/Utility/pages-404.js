import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

//Import Images
import errorImg from '../../../assets/images/404-error.png';

const Pages404 = () => {
  useEffect(() => {
    document.body.className = 'authentication-bg';
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = '';
    };
  });

  return (
    <React.Fragment>
      <div className="my-5 pt-sm-5">
        <Container>
          <Row>
            <Col md={12}>
              <div className="text-center">
                <div>
                  <Row className="row justify-content-center">
                    <Col sm={4}>
                      <div className="error-img">
                        <img
                          src={errorImg}
                          alt=""
                          className="img-fluid mx-auto d-block"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <h4 className="text-uppercase mt-4">Sorry, page not found</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Pages404;
