import { Form } from 'formik';
import { useMemo } from 'react';
import { TeamLeadsAutocomplete, FormField } from '../../components';
import CustomLink from '../../components/Common/CustomLink';
import { UserRole } from '../../enums';

const mapOptionToDbEntity = (option) => {
  return {
    name: option.label,
    id: option.value,
  };
};

const formFields = ({ teamLeads, setFieldValue }) =>
  [
    {
      id: 'teamLeadId',
      name: 'teamLeadId',
      label: 'TeamLeads:',
      component: TeamLeadsAutocomplete,
      optionsMapper: (teamLead) => ({
        ...teamLead,
        value: teamLead.id,
        label: `${teamLead.firstName} ${teamLead.lastName}`,
      }),
      optionsSort: (o) => (o.role === UserRole.TeamLead ? -1 : 1),
      customSetFieldValue: (option) =>
        setFieldValue('teamLead', mapOptionToDbEntity(option)),
      notInIds: teamLeads.map((sa) => sa.teamLeadId),
      placeholder: 'Select TeamLead',
      isClearable: false,
      show: true,
    },
  ].filter(({ show }) => show);

const renderFormField = ({ show, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const AssignTeamLeadForm = ({
  isEdit,
  setFieldValue,
  onFormClose,
  teamLeads,
  loading,
}) => {
  const fields = useMemo(
    () =>
      formFields({
        isEdit,
        setFieldValue,
        teamLeads,
      }).map(renderFormField),
    [isEdit, teamLeads, setFieldValue],
  );
  return (
    <Form className="user-desks-form" autoComplete="off">
      {fields}
      <div className="pr-form-buttons mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {isEdit ? 'Edit' : 'Save'}
        </button>
        <CustomLink to="t">
          <button
            onClick={onFormClose}
            type="button"
            className="btn btn-inverse m-l-1"
          >
            Cancel
          </button>
        </CustomLink>
      </div>
    </Form>
  );
};

export default AssignTeamLeadForm;
