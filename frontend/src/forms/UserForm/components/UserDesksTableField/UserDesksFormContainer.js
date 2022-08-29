import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { openModal } from '../../../../components/Modal/actions';
import { UserRole } from '../../../../enums';
import { DesksTable } from './DesksTable';

import './UserDesksForm.scss';

let globalUserDesks = [];

const UserDesksFormContainer = ({
  isEdit,
  setFieldValue,
  formUserRole,
  userDesks,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    globalUserDesks = userDesks;
    return () => {
      globalUserDesks = [];
    };
  }, [userDesks]);

  const onUserDeskAddSubmit = (addedUserDesk, _closeModal) => {
    const isDeskAlreadyInList = (userDesks || []).some(
      (ud) => ud.deskId === addedUserDesk.deskId,
    );
    if (!isDeskAlreadyInList) {
      const newUserDesks = [...userDesks, addedUserDesk];
      setFieldValue('userDesks', newUserDesks);
      globalUserDesks = newUserDesks;
    }
  };

  const onUserDeskRemoveClick = (userDesk) => {
    const { deskId } = userDesk;
    if (globalUserDesks.find((d) => d.deskId === deskId)) {
      const newUserDesks = globalUserDesks.filter((ud) => ud.deskId !== deskId);
      setFieldValue('userDesks', newUserDesks);
      globalUserDesks = newUserDesks;
    }
  };

  function openUserDesksModal() {
    dispatch(
      openModal({
        id: 'user-desk',
        type: 'form',
        onSubmit: onUserDeskAddSubmit,
        payload: {
          header: 'User Desks',
          formName: 'userDesks',
          userDesks,
          formUserRole,
        },
      }),
    );
  }

  const data = React.useMemo(() => userDesks, [userDesks]);
  return (
    <div className="form-group row">
      <div className="desks-table-container ">
        <div className="table-container">
          <DesksTable
            data={data}
            isEdit={isEdit}
            onUserDeskRemoveClick={onUserDeskRemoveClick}
            formUserRole={formUserRole}
          />
        </div>
        {!(formUserRole === UserRole.TeamLead && data.length) && (
          <div className="icon-wrapper">
            <FontAwesomeIcon
              cursor="pointer"
              icon={faPlusCircle}
              color="Dodgerblue"
              onClick={openUserDesksModal}
              size="lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const {
    field: { value: userDesks = [] },
    form: {
      setFieldValue,
      values: { role },
    },
  } = props;

  return {
    formUserRole: role,
    userDesks,
    setFieldValue,
  };
};

export default connect(mapStateToProps)(UserDesksFormContainer);
