import { Formik } from 'formik';
import { connect } from 'react-redux';

import CompanyForm from './CompanyForm';
import getValidationSchema from './companyFormValidationSchema';

const CompanyFormContainer = ({
  isEdit,
  loading,
  onFormClose,
  handleSubmit,
  initialValues,
}) => {
  const onSubmit = (form) => {
    handleSubmit(form);

    onFormClose && onFormClose();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={getValidationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <CompanyForm
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
  const { companyId, onFormSubmit } = props;

  const initialValues = {
    companyId: companyId || undefined,
  };

  return {
    initialValues,
    handleSubmit: onFormSubmit,
  };
}

export default connect(mapStateToProps)(CompanyFormContainer);
