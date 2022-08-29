import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { UserRole, UserRoleLabel } from '../../../../enums';

const UserProfile = ({ userState }) => {
  const { username, role, firstName, lastName, desk } = userState;
  return (
    <>
      <Col md={7} lg={7} xl={7} className="my-5" style={{ width: '38%' }}>
        <Card className="h-100">
          <CardBody>
            <div className="text-left">
              <div className="clearfix"></div>
              <h5 className="mt-3 mb-1">
                Username: <strong>{username}</strong>
              </h5>
              <h5 className="mt-3 mb-1">
                Role: <strong>{UserRoleLabel[role]}</strong>
              </h5>
              {desk && (role === UserRole.TeamLead || role === UserRole.Agent) && (
                <h5 className="mt-3 mb-1">
                  Desk: <strong>{desk.name}</strong>
                </h5>
              )}

              <hr className="my-4" />

              <div className="text-muted">
                <div className="table-responsive mt-4">
                  <div>
                    <p className="mb-1">First name :</p>
                    <h5 className="font-size-16">{firstName}</h5>
                  </div>
                  <div className="mt-4">
                    <p className="mb-1">Last name :</p>
                    <h5 className="font-size-16">{lastName}</h5>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default connect()(withRouter(UserProfile));
