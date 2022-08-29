import { connect } from 'react-redux';
import { Formik } from 'formik';
import UserForm from './UserForm';
import getValidationSchema from './userFormValidationSchema';
import { useMemo } from 'react';
import { UserRole } from '../../enums';

const UserFormContainer = ({
  isEdit,
  loading,
  handleSubmit,
  initialValues,
}) => {
  const onSubmit = (form) => {
    const { userDesks, deskId, role } = form;
    let mappedUserDesks = [];
    if (Array.isArray(userDesks)) {
      mappedUserDesks = userDesks.map(({ id, deskId }) => ({
        id,
        deskId,
      }));
    }

    if (deskId && !Array.isArray(userDesks) && typeof deskId === 'number') {
      mappedUserDesks = [{ deskId }];
    }

    handleSubmit({
      ...form,
      ...([UserRole.SuperManager, UserRole.Agent].includes(role) && {
        userDesks: mappedUserDesks,
      }),
    });
  };

  const userRole = localStorage.getItem('userRole');

  const validationSchema = useMemo(
    () => getValidationSchema(isEdit, userRole),
    [isEdit, userRole],
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <UserForm
          values={values}
          isEdit={isEdit}
          loading={loading}
          setFieldValue={setFieldValue}
        />
      )}
    </Formik>
  );
};

function mapStateToProps(state, { isEdit, loading }) {
  const { current: currentUser, loading: getUserLoading } = state.GetUser;

  const {
    firstName,
    lastName,
    username,
    role,
    password,
    userDesks,
    userTeamLeads,
    userBrands,
    brandId,
    teamLeadId,
  } = currentUser || {};

  const initialValues = {
    firstName,
    lastName,
    username,
    role,
    password,
    userDesks,
    userTeamLeads,
    userBrands,
    brandId,
    teamLeadId,
  };

  return {
    currentUser,
    initialValues,
    loading: getUserLoading || loading,
  };
}

export default connect(mapStateToProps)(UserFormContainer);
