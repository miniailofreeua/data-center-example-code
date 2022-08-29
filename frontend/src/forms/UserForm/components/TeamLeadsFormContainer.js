import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import './TeamLeadsForm.scss';
import { openModal } from '../../../components/Modal/actions';
import { TeamLeadsTable } from './TeamLeadTable';
let globalTeamLeads = [];

const TeamLeadsFormContainer = ({ setFieldValue, teamLeads }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    globalTeamLeads = teamLeads;
    return () => {
      globalTeamLeads = [];
    };
  }, [teamLeads]);

  const onTeamLeadsAddSubmit = (addedTeamLead, _closeModal) => {
    const isTeamLeadAlreadyInList = (teamLeads || []).some(
      (sa) => sa?.teamLeadId === addedTeamLead?.teamLeadId,
    );
    if (!isTeamLeadAlreadyInList) {
      const newTeamLead = [...teamLeads, addedTeamLead];
      setFieldValue('userTeamLeads', newTeamLead);
      globalTeamLeads = newTeamLead;
    }
  };

  const onTeamLeadsRemoveClick = (teamLead) => {
    const { teamLeadId } = teamLead;
    if (globalTeamLeads.find((d) => d.teamLeadId === teamLeadId)) {
      const newTeamLead = globalTeamLeads.filter(
        (sa) => sa.teamLeadId !== teamLeadId,
      );
      setFieldValue('userTeamLeads', newTeamLead);
      globalTeamLeads = newTeamLead;
    }
  };

  function openTeamLeadModal() {
    dispatch(
      openModal({
        id: 'teamLead',
        type: 'form',
        onSubmit: onTeamLeadsAddSubmit,
        payload: {
          header: 'TeamLead',
          formName: 'teamLeads',
          teamLeads,
        },
      }),
    );
  }

  const data = React.useMemo(() => teamLeads, [teamLeads]);

  return (
    <div className="form-group row">
      <div className="desks-table-container ">
        <div className="table-container">
          <TeamLeadsTable
            data={data}
            onTeamLeadsRemoveClick={onTeamLeadsRemoveClick}
          />
        </div>

        <div className="icon-wrapper">
          <FontAwesomeIcon
            cursor="pointer"
            icon={faPlusCircle}
            color="Dodgerblue"
            onClick={openTeamLeadModal}
            size="lg"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const {
    field: { value: teamLeads = [] },
    form: { setFieldValue },
  } = props;

  return {
    teamLeads,
    setFieldValue,
  };
};

export default connect(mapStateToProps)(TeamLeadsFormContainer);
