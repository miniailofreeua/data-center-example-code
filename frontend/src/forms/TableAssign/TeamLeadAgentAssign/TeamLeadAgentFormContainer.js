import { Formik } from 'formik';
import { connect } from 'react-redux';

import DeskForm from './TeamLeadAgentForm';
import getValidationSchema from './TeamLeadAgentFormValidationSchema';

const userRole = localStorage.getItem('userRole');

const DeskFormContainer = ({
  isEdit,
  loading,
  onFormClose,
  initialValues,
  handleSubmit,
}) => {
  const onSubmit = (form) => {
    handleSubmit(form);
    onFormClose && onFormClose();
  };

  const validationSchema = getValidationSchema(userRole);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <DeskForm
          setFieldValue={setFieldValue}
          values={values}
          isEdit={isEdit}
          loading={loading}
          onFormClose={onFormClose}
        />
      )}
    </Formik>
  );
};

function mapStateToProps(state, props) {
  const { agentId, teamLeadId, onFormSubmit } = props;
  const initialValues = {
    agentId: agentId || undefined,
    teamLeadId: teamLeadId || undefined,
  };

  return {
    initialValues,
    handleSubmit: onFormSubmit,
  };
}

export default connect(mapStateToProps)(DeskFormContainer);
