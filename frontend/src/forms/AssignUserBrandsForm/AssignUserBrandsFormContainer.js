import { connect } from 'react-redux';
import { Formik } from 'formik';
import AssignUserBrandForm from './AssignUserBrandsForm';
import ValidationSchema from './assignUserBrandsFormValidationSchema';
import { toastWarning } from '../../services/notifications';

const AssignUserBrandsFormContainer = ({
  initialValues,
  onFormSubmit,
  onFormClose,
  userBrands,
  formUserRole,
  loading,
}) => {
  const handleSubmit = (form) => {
    if (userBrands.some((ud) => ud.brand.id === form.brand.id)) {
      toastWarning({
        message: `"${form.brand.label}" brand is already in the list`,
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
      validationSchema={ValidationSchema(formUserRole)}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <AssignUserBrandForm
          formUserRole={formUserRole}
          setFieldValue={setFieldValue}
          values={values}
          userBrands={userBrands}
          onFormClose={onFormClose}
          loading={loading}
        />
      )}
    </Formik>
  );
};

function mapStateToProps() {
  const initialValues = {
    brandId: undefined,
  };

  return {
    initialValues,
  };
}

export default connect(mapStateToProps)(AssignUserBrandsFormContainer);
