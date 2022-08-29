import { Card, CardBody, Col, Row } from 'reactstrap';
import faqimg from '../../assets/images/faqs-img.png';

const NotFoundLayout = () => {
  return (
    <div
      className="my-5 pt-sm-5 w-75"
      style={{ marginRight: '13%', marginLeft: 'auto' }}
    >
      <Row>
        <Card>
          <CardBody>
            <div className="text-center">
              <div>
                <Row className="row justify-content-center">
                  <Col sm={4}>
                    <div className="error-img">
                      <img
                        src={faqimg}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <h4 className="text-uppercase mt-4">
                Sorry, probably you dont have access to this page
              </h4>
            </div>
          </CardBody>
        </Card>
      </Row>
    </div>
  );
};

export default NotFoundLayout;
