import { Formik } from 'formik';
import { connect } from 'react-redux';

import DeskForm from './DeskForm';
import getValidationSchema from './deskFormValidationSchema';

const DeskFormContainer = ({
  initialValues,
  isEdit,
  handleSubmit,
  loading,
}) => {
  const onSubmit = (form) => {
    handleSubmit(form);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={getValidationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <DeskForm
          setFieldValue={setFieldValue}
          values={values}
          isEdit={isEdit}
          loading={loading}
        />
      )}
    </Formik>
  );
};

function mapStateToProps(state, { isEdit }) {
  const { current, loading } = state.GetDesk;

  const initialValues = {
    name: current?.name || undefined,
    brandId: current?.brandId || undefined,
  };

  return {
    initialValues,
    loading: loading,
  };
}

export default connect(mapStateToProps)(DeskFormContainer);
