import { useCallback, useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';

import RoleManager from '../../../containers/RoleManager/RoleManager';
import { ReactStickyTable } from '../../../components';
import TradersColumnList from './TradersColumnList';
import { ContentPage } from '../../../components';

import {
  openAssignDesk,
  openAssignCompany,
  openAssignTeamLeadAndAgent,
} from './helpers/index';

import { clearGetTradersState, getTraders } from '../../../store/actions';
import { UserRole } from '../../../enums';

import './styles.scss';

const userRole = localStorage.getItem('userRole');

const TradersList = ({ traders, count, loading }) => {
  const dispatch = useDispatch();

  const onUnmount = useCallback(() => {
    dispatch(clearGetTradersState());
  }, [dispatch]);

  useEffect(() => {
    return onUnmount;
  }, [dispatch, onUnmount]);

  const data = useMemo(() => traders, [traders]);

  return (
    <ContentPage
      pageName=""
      breadcrumbs={[{ text: 'Traders' }]}
      actions={[
        {
          name: 'Import Traders',
          link: '/traders/import',
          show: [UserRole.Admin, UserRole.SuperManager].includes(userRole),
        },
      ].filter(({ show }) => show)}
    >
      <ReactStickyTable
        columns={TradersColumnList({
          dispatch,
          openAssignDesk,
          openAssignCompany,
          openAssignTeamLeadAndAgent,
        })}
        data={data}
        fetchData={getTraders}
        totalCount={count}
        loading={loading}
      />
    </ContentPage>
  );
};

function mapStateToProps(state) {
  const {
    GetTraders: { list: traders, count, loading },
  } = state;

  return {
    traders,
    count,
    loading,
  };
}

export default connect(mapStateToProps)(
  RoleManager(connect()(TradersList), [
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.TeamLead,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
    UserRole.TeamLead,
    UserRole.Agent,
  ]),
);
