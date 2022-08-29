import { UserRole, UserRoleListOptions } from '../../../../enums';
import { updateUser } from '../../../../store/actions';

export const getActions = (roleToCreate, hash) => {
  const userRole = localStorage.getItem('userRole');
  return [
    {
      name: `Create ${roleToCreate && roleToCreate.label}`,
      link: `/users/create?prop=${hash}`,
      show: userRole === UserRole.TeamLead || userRole === UserRole.Admin,
    },
  ].filter(({ show }) => show);
};

export const getBrandsLabel = (userBrands) => {
  return Array.isArray(userBrands) && userBrands.length
    ? userBrands.map(({ brand }) => brand?.name).join(', ')
    : null;
};

export function toUpdate({ userId, redirect, values }) {
  const options = {
    payload: {
      username: values.username,
      lastName: values.lastName,
      firstName: values.firstName,
      role: values.role,
    },
    userId,
    redirect,
  };

  if (values.deskId) {
    options.payload.deskId = values.deskId;
  }

  if (values.password !== '') {
    options.payload.password = values.password;
  }

  return updateUser(options);
}

export function getFieldsToRender({
  userState,
  desksList,
  onChangeGetState,
  usernameState,
  firstNameState,
  lastNameState,
}) {
  const { role, desks } = userState;

  const componentsList = [
    {
      columnType: 'field',
      name: 'username',
      label: 'Username',
      placeholder: 'Input Username',
      type: 'string',
      value: usernameState,
      onChange: onChangeGetState,
      show: true,
    },

    {
      columnType: 'field',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Input First Name',
      type: 'string',
      value: firstNameState,
      onChange: onChangeGetState,
      show: true,
    },
    {
      columnType: 'field',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Input Last Name',
      type: 'string',
      value: lastNameState,
      onChange: onChangeGetState,
      show: true,
    },

    {
      columnType: 'field',
      name: 'password',
      label: 'Password',
      placeholder: 'Input Password',
      type: 'password',
      show: role !== UserRole.Agent,
    },

    {
      columnType: 'select',
      disabled: true,
      name: 'role',
      defaultValue: role,
      label: 'Role',
      placeholder: 'Select Role',
      options: UserRoleListOptions,
      show: true,
    },

    {
      columnType: 'select',
      name: 'deskId',
      defaultValue: desks.length ? desks[0].id : undefined,
      label: 'Desk',
      placeholder: 'Select Desk',
      options: (desksList || []).map(({ id, name }) => ({
        value: id,
        label: name,
      })),
      show: role === UserRole.TeamLead || role === UserRole.Agent,
    },
  ].filter(({ show }) => show);

  return componentsList;
}
