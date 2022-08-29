import { connect } from 'react-redux';
import { Formik } from 'formik';
import BrandForm from './BrandForm';
import getValidationSchema from './brandFormValidationSchema';

const BrandFormContainer = ({
  initialValues,
  handleSubmit,
  isEdit,
  loading,
}) => {
  const onSubmit = (form) => {
    handleSubmit(form);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={getValidationSchema()}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <>
          <BrandForm values={values} isEdit={isEdit} loading={loading} />
        </>
      )}
    </Formik>
  );
};

function mapStateToProps(state) {
  const { current, loading } = state.GetBrand;

  const { name, userDetailsUrl, brandUrl, brandUpdateApis, brandPullApis } =
    current || {};

  const initialValues = {
    name: name || undefined,
    userDetailsUrl: userDetailsUrl || undefined,
    brandUrl: brandUrl || undefined,
    brandUpdateApis: brandUpdateApis || [],
    brandPullApis: brandPullApis || [],
  };

  return {
    initialValues,
    loading,
  };
}

export default connect(mapStateToProps)(BrandFormContainer);
