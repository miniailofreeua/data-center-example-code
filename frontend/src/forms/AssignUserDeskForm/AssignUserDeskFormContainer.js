import { connect } from 'react-redux';
import { Formik } from 'formik';
import AssignUserDeskForm from './AssignUserDeskForm';
import ValidationSchema from './assignUserDeskFormValidationSchema';
import { toastWarning } from '../../services/notifications';

const AssignUserDeskFormContainer = ({
  initialValues,
  onFormSubmit,
  onFormClose,
  userBrands,
  userDesks,
  UserDeskOfCurrentUser,
  formUserRole,
  loading,
}) => {
  const handleSubmit = (form) => {
    if (userDesks.some((ud) => ud.deskId === form.deskId)) {
      toastWarning({
        message: `"${form.desk.name}" desk is already in the list`,
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
        <AssignUserDeskForm
          formUserRole={formUserRole}
          setFieldValue={setFieldValue}
          values={values}
          userDesks={UserDeskOfCurrentUser}
          userBrands={userBrands}
          onFormClose={onFormClose}
          loading={loading}
        />
      )}
    </Formik>
  );
};

function mapStateToProps(state) {
  const {
    user: { userBrands, userDesks: UserDeskOfCurrentUser },
  } = state.GetCurrentUser;

  const initialValues = {
    deskId: undefined,
  };

  return {
    initialValues,
    UserDeskOfCurrentUser,
    userBrands,
  };
}

export default connect(mapStateToProps)(AssignUserDeskFormContainer);
