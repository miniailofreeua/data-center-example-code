import { useMemo, useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContentPage, ReactStickyTable } from '../../../../components';
import RoleManager from '../../../../containers/RoleManager/RoleManager';
import { UserRole } from '../../../../enums';
import { hashing } from '../../../../services/hash';

import { clearGetUsersState, getUsers } from '../../../../store/actions';
import UsersColumnList from '../UsersColumnList';

const userRole = localStorage.getItem('userRole');
const getActions = (hash) =>
  [
    {
      name: `Create ${userRole === UserRole.TeamLead ? 'Agent' : 'User'}`,
      link: `/users/create?prop=${hash}`,
      show: true,
    },
  ].filter(({ show }) => show);

const UsersList = ({ users, count }) => {
  const roleToCreate =
    userRole === UserRole.Admin
      ? { key: 'user', label: 'User' }
      : { key: 'agent', label: 'Agent' };
  const hash = hashing(roleToCreate);

  const dispatch = useDispatch();
  const onUnmount = useCallback(() => {
    dispatch(clearGetUsersState());
  }, [dispatch]);

  useEffect(() => {
    return onUnmount;
  }, [dispatch, onUnmount]);

  const data = useMemo(() => users, [users]);

  return (
    <ContentPage
      pageName="Users"
      breadcrumbs={[{ text: 'Users' }]}
      actions={getActions(hash)}
    >
      <div>
        <ReactStickyTable
          data={data}
          columns={UsersColumnList}
          fetchData={getUsers}
          totalCount={count}
        />
      </div>
    </ContentPage>
  );
};

function mapStateToProps(state) {
  const {
    GetUsers: { list: users, count },
  } = state;

  return {
    users: users || [],
    count,
  };
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  RoleManager(connect()(UsersList), [
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
    UserRole.TeamLead,
  ]),
);
