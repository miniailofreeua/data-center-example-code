import { connect } from 'react-redux';
import { Formik } from 'formik';
import AssignTeamLeadForm from './AssignTeamLeadForm';
import getValidationSchema from './assignTeamLeadFormValidationSchema';
import { toastWarning } from '../../services/notifications';

const AssignTeamLeadFormContainer = ({
  initialValues,
  onFormSubmit,
  onFormClose,
  teamLeads,
  loading,
}) => {
  const handleSubmit = (form) => {
    if (teamLeads.some((sa) => sa.teamLeadId === form.teamLeadId)) {
      toastWarning({
        message: `"${form?.name}" TeamLead is already in the list`,
      });
      return;
    }
    onFormSubmit(form);
    onFormClose && onFormClose();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={getValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <AssignTeamLeadForm
          setFieldValue={setFieldValue}
          values={values}
          teamLeads={teamLeads}
          onFormClose={onFormClose}
          loading={loading}
        />
      )}
    </Formik>
  );
};

function mapStateToProps() {
  const initialValues = {
    teamLeadId: undefined,
  };

  return {
    initialValues,
  };
}

export default connect(mapStateToProps)(AssignTeamLeadFormContainer);
