import { Formik } from 'formik';
import { connect } from 'react-redux';

import DeskForm from './DeskForm';
import getValidationSchema from './deskFormValidationSchema';

const DeskFormContainer = ({
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
  const { deskId, onFormSubmit } = props;
  const initialValues = {
    deskId: deskId || undefined,
  };

  return {
    initialValues,
    handleSubmit: onFormSubmit,
  };
}

export default connect(mapStateToProps)(DeskFormContainer);
