import { Alert, Col } from 'reactstrap';
import classNames from 'classnames';

import CustomLink from '../../Common/CustomLink';

import './styles.scss';

export const renderActions = ({ actions = [] }) => {
  return actions.map(({ name, link }) => {
    return (
      <Col md={6} style={{ marginLeft: 'auto' }}>
        <div className="form-inline float-md-end mb-3">
          <div className="search-box">
            <div className="position-relative">
              <CustomLink to={link} className="btn btn-primary">
                {name}
              </CustomLink>
            </div>
          </div>
        </div>
      </Col>
    );
  });
};

export const renderStats = ({ stats }) => (
  <div>
    {(stats || []).map(({ label, stats }) => (
      <span
        style={{
          display: 'inline-block',
          width: 'fitContent !important',
          marginRight: '7px',
        }}
      >
        <strong>{label}</strong>: {stats}
      </span>
    ))}
  </div>
);

export const noDataIndicationRender = ({ loading, isStickyTable, data }) => {
  return (
    <>
      {loading && (
        <div className="table-spinner">
          <i className="uil-shutter-alt spin-icon" />
        </div>
      )}

      {!loading && (!data || data.length === 0) && (
        <div className={classNames('table-spinner')}>
          <Alert color="info" style={{ display: 'inline-block' }}>
            No data yet
          </Alert>
        </div>
      )}
    </>
  );
};
