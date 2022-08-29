import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Form } from 'formik';

import { AgentsAutocomplete, TeamLeadsAutocomplete } from '../../../components';
import { FormField } from '../../../components';

import { UserRole } from '../../../enums';

import './styles.scss';

const userRole = localStorage.getItem('userRole');

const formFields = ({ teamLeadId }) =>
  [
    {
      id: 'teamLeadId',
      name: 'teamLeadId',
      label: 'TeamLead:',
      className: 'desk-field',
      component: TeamLeadsAutocomplete,
      show: [UserRole.CrmManager, UserRole.DeskManager].includes(userRole),
    },
    {
      id: 'agentId',
      name: 'agentId',
      label: 'Agent:',
      className: 'desk-field',
      component: AgentsAutocomplete,
      teamLeadId,
      show: true,
    },
  ].filter(({ show }) => show);

const renderFormField = ({ show, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const TeamLeadAgentForm = ({ values, isEdit, loading, onFormClose }) => {
  const { user } = useSelector((state) => state.GetCurrentUser);

  const teamLeadId = [UserRole.TeamLead].includes(userRole)
    ? user?.id
    : values?.teamLeadId;

  const memoizedTeamLeadId = useMemo(() => teamLeadId, [teamLeadId]);

  return (
    <Form className="teamLead-agent-form" autoComplete="off">
      {formFields({ teamLeadId: memoizedTeamLeadId }).map(renderFormField)}
      <div className="pr-form-buttons">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {isEdit ? 'Edit' : 'Save'}
        </button>
        <button
          onClick={onFormClose}
          type="button"
          className="btn btn-inverse m-l-1"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

export default TeamLeadAgentForm;
