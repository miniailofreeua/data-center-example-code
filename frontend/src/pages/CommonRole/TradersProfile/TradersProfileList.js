import { useCallback, useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { ContentPage, ReactTable } from '../../../components';
import RoleManager from '../../../containers/RoleManager/RoleManager';
import { UserRole } from '../../../enums';
import { getParams } from '../../../services/getParams';
import { parse } from '../../../services/hash';

import {
  clearGetTraderProfileState,
  getTraderProfile,
} from '../../../store/actions';

import ProfileCredentials from './components/ProfileCredentials';
import TradersProfileColumnList from './TradersProfileColumnList';

const TradersProfileList = (data) => {
  const dispatch = useDispatch();

  const hashedTraderId = getParams('id');
  const traderId = Number(parse(hashedTraderId));

  const onUnmount = useCallback(() => {
    dispatch(clearGetTraderProfileState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTraderProfile(traderId));
    return onUnmount;
  }, [dispatch, onUnmount, traderId]);

  const { credentials, profiles, trader } = useMemo(() => data, [data]);

  return (
    <ContentPage
      pageName="TradersProfile"
      breadcrumbs={[{ text: 'TradersProfile' }]}
    >
      <Row>
        <Col xl="4" className="profile-credentials">
          <ProfileCredentials
            credentials={credentials}
            profiles={profiles}
            trader={trader}
          />
        </Col>
        <Col xl="8">
          <ReactTable
            data={profiles || []}
            columns={TradersProfileColumnList}
            totalCount={profiles.length}
            isStickyHeader
          />
        </Col>
      </Row>
    </ContentPage>
  );
};

function mapStateToProps(state) {
  const {
    GetTradersProfile: { profiles, credentials, trader },
  } = state;

  return {
    profiles,
    credentials,
    trader,
  };
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  RoleManager(connect()(TradersProfileList), [
    UserRole.Admin,
    UserRole.SuperManager,
  ]),
);
