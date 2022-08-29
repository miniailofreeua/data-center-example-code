import { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { DeskForm } from '../../../../forms';
import { ContentPage } from '../../../../components';
import RoleManager from '../../../../containers/RoleManager/RoleManager';

import { UserRole } from '../../../../enums';
import { parse } from '../../../../services/hash';
import { getParams } from '../../../../services/getParams';
import {
  clearGetDeskState,
  getDesk,
  updateDesk,
} from '../../../../store/actions';

const EditDesk = ({ loading }) => {
  const dispatch = useDispatch();
  const hashedDeskId = getParams('id');
  const deskId = Number(parse(hashedDeskId));

  const onUnmount = useCallback(() => {
    dispatch(clearGetDeskState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDesk(deskId));
    return onUnmount;
  }, [deskId, dispatch, onUnmount]);

  const handleSubmit = (form) => {
    dispatch(updateDesk(deskId, form));
  };

  return (
    <ContentPage
      pageName="Edit Desk"
      breadcrumbs={[{ link: '/desks', text: 'Desks' }, { text: 'Edit Desk' }]}
    >
      <div className="form-container">
        <div className="form shadow-wrapper bg-white p-3">
          <DeskForm isEdit handleSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </ContentPage>
  );
};

function mapStateToProps(state) {
  const { loading } = state.UpdateDesk;

  return {
    loading,
  };
}

export default RoleManager(connect(mapStateToProps)(EditDesk), [
  UserRole.Admin,
  UserRole.SuperManager,
]);
