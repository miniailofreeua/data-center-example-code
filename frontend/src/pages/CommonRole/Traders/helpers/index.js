import { openModal, updateTraderToBrands } from '../../../../store/actions';

export const openAssignDesk = ({ dispatch, traderId, deskId }) => {
  const deskAssignationSubmit = (payload) => {
    dispatch(updateTraderToBrands({ payload, traderId }));
  };

  dispatch(
    openModal({
      id: 'desk-assign',
      type: 'form',
      onSubmit: deskAssignationSubmit,
      payload: {
        header: ' ',
        formName: 'deskAssign',
        traderId,
        deskId,
      },
    }),
  );
};

export const openAssignCompany = ({ dispatch, traderId, companyId }) => {
  const companyAssignationSubmit = (payload) => {
    dispatch(updateTraderToBrands({ payload, traderId }));
  };

  dispatch(
    openModal({
      id: 'company-assign',
      type: 'form',
      onSubmit: companyAssignationSubmit,
      payload: {
        header: ' ',
        formName: 'companyAssign',
        traderId,
        companyId,
      },
    }),
  );
};

export const openAssignTeamLeadAndAgent = ({
  dispatch,
  agentId,
  traderId,
  teamLeadId,
}) => {
  const teamLeadAndAgentAssignationSubmit = (payload) => {
    dispatch(updateTraderToBrands({ payload, traderId }));
  };

  dispatch(
    openModal({
      id: 'teamLead-agent-assign',
      type: 'form',
      onSubmit: teamLeadAndAgentAssignationSubmit,
      payload: {
        header: ' ',
        formName: 'teamLeadAgentAssign',
        agentId,
        traderId,
        teamLeadId,
      },
    }),
  );
};
