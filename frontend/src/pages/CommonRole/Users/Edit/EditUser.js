import React, { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ContentPage } from '../../../../components';
import RoleManager from '../../../../containers/RoleManager/RoleManager';
import { UserRole } from '../../../../enums';
import { UserForm } from '../../../../forms';
import { getParams } from '../../../../services/getParams';
import { parse } from '../../../../services/hash';
import {
  clearGetUserState,
  getUser,
  updateUser,
} from '../../../../store/actions';

const EditUser = ({ loading }) => {
  const dispatch = useDispatch();
  const hashedSaleId = getParams('id');
  const userId = Number(parse(hashedSaleId));

  const onUnmount = useCallback(() => {
    dispatch(clearGetUserState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser(userId));
    return onUnmount;
  }, [userId, dispatch, onUnmount]);

  const handleSubmit = (form) => {
    const {
      username,
      firstName,
      lastName,
      password,
      userDesks,
      userTeamLeads,
      role,
      teamLeadId,
    } = form;
    const payload = {
      username,
      firstName,
      lastName,
      role,
      ...(password && { password }),
      ...(teamLeadId && { teamLeadId }),
      userDesks,
      userTeamLeads,
    };

    dispatch(
      updateUser({
        isCascadeUpdateAllowed: true,
        userId,
        payload,
      }),
    );
  };

  return (
    <ContentPage
      pageName="Edit User"
      breadcrumbs={[{ link: '/users', text: 'Users' }, { text: 'Edit User' }]}
    >
      <div className="form-container">
        <div className="form shadow-wrapper bg-white p-3">
          <UserForm
            isEdit
            userId={userId}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </ContentPage>
  );
};

function mapStateToProps(state) {
  const { loading } = state.UpdateUser;

  return {
    loading,
  };
}

export default RoleManager(
  connect(mapStateToProps)(EditUser),
  [
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
    UserRole.TeamLead,
  ],
  {},
);
