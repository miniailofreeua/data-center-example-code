import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import DesksColumnList from './DesksColumnList';
import { ContentPage, ReactTable } from '../../../components';
import RoleManager from '../../../containers/RoleManager/RoleManager';

import { getActions } from './helpers';
import { UserRole } from '../../../enums';
import { clearGetDesksState, getDesks } from '../../../store/actions';

const DesksList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.GetDesks);

  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    return () => {
      dispatch(clearGetDesksState());
    };
  }, [dispatch]);

  return (
    <ContentPage
      pageName="Desks"
      breadcrumbs={[{ text: 'Desks' }]}
      actions={getActions(userRole)}
    >
      <div>
        <ReactTable
          pageName="Desks"
          data={list}
          columns={DesksColumnList}
          fetchData={getDesks}
          loading={loading}
        />
      </div>
    </ContentPage>
  );
};

export default withRouter(
  RoleManager(connect()(DesksList), [
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.DeskManager,
  ]),
);
