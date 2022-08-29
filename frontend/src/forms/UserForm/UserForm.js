import { Form } from 'formik';

import checkWhatForRoleOptions from './helpers/checkWhatForRoleOptions';
import TeamLeadsFormContainer from './components/TeamLeadsFormContainer';
import BrandsTableField from './components/UserBrandsTableField ';
import DesksTableField from './components/UserDesksTableField';
import CustomLink from '../../components/Common/CustomLink';
import {
  DesksAutocomplete,
  FormField,
  SelectFormFieldFormik,
  TeamLeadsAutocomplete,
} from '../../components';

import { UserRole, UserRoleListOptions } from '../../enums';

const userRole = localStorage.getItem('userRole');

const formFields = ({ role, isEdit, handleNameTextFieldChange }) =>
  [
    {
      id: 'role',
      name: 'role',
      label: 'Role:',
      component: SelectFormFieldFormik,
      isClearable: false,
      isMulti: false,
      selectedOption: UserRoleListOptions.find((o) => o.value === role),
      options: checkWhatForRoleOptions(),
      show: true,
      disabled: isEdit || userRole === UserRole.TeamLead,
    },
    {
      id: 'firstName',
      name: 'firstName',
      label: 'First Name:',
      type: 'text',
      onChange: handleNameTextFieldChange('firstName'),
      className: 'form-control',
      placeholder: 'First Name',
      show: true,
    },
    {
      id: 'lastName',
      name: 'lastName',
      label: 'Last Name:',
      type: 'text',
      onChange: handleNameTextFieldChange('lastName'),
      className: 'form-control',
      placeholder: 'Last Name',
      show: true,
    },
    {
      id: 'username',
      name: 'username',
      label: 'Username:',
      type: 'text',
      onChange: handleNameTextFieldChange('username'),
      className: 'form-control',
      placeholder: 'Username',
      show: true,
    },
    {
      id: 'password',
      name: 'password',
      label: 'Password:',
      type: 'text',
      onChange: handleNameTextFieldChange('password'),
      className: 'form-control',
      placeholder: 'Password',
      show: role !== UserRole.Agent,
    },
    {
      id: 'userDesks',
      name: 'userDesks',
      label: 'Select Desk(s):',
      className: 'desk-field',
      component: DesksTableField,
      isEdit,
      show: [
        UserRole.CrmManager,
        UserRole.DeskManager,
        UserRole.TeamLead,
      ].includes(role),
    },
    {
      id: 'deskId',
      name: 'deskId',
      label: 'Select Desk(s):',
      className: 'desk-field',
      component: DesksAutocomplete,
      isClearable: false,
      isEdit,
      show: [UserRole.Agent].includes(role),
    },
    {
      id: 'teamLeadId',
      name: 'teamLeadId',
      label: 'Select TeamLead:',
      className: 'desk-field',
      component: TeamLeadsAutocomplete,
      show:
        (userRole === UserRole.CrmManager ||
          userRole === UserRole.DeskManager) &&
        UserRole.Agent === role,
    },
    {
      id: 'teamLeads',
      name: 'userTeamLeads',
      label: 'Assigned TeamLead(s):',
      className: 'saleAgents-field',
      component: TeamLeadsFormContainer,
      show:
        (userRole === UserRole.Admin || userRole === UserRole.Company) &&
        [UserRole.CrmManager, UserRole.DeskManager].includes(role),
    },
    {
      id: 'brands',
      name: 'userBrands',
      label: 'Assigned Brand(s):',
      className: 'saleAgents-field',
      component: BrandsTableField,
      show: userRole === UserRole.Admin && [UserRole.Company].includes(role),
    },
  ].filter(({ show }) => show);

const renderFormField = ({ show, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const UserForm = ({ values, isEdit, loading, setFieldValue }) => {
  const handleNameTextFieldChange = (fieldName) => (event) => {
    const { value } = event.target;
    setFieldValue(fieldName, value ? value.trim() : null);
  };

  return (
    <Form className="user-form" autoComplete="off">
      {formFields({
        isEdit,
        role: values.role,
        handleNameTextFieldChange,
      }).map(renderFormField)}
      <div className="pr-form-buttons">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {isEdit ? 'Edit' : 'Save'}
        </button>
        <CustomLink to="users">
          <button type="button" className="btn btn-inverse m-l-1">
            Cancel
          </button>
        </CustomLink>
      </div>
    </Form>
  );
};

export default UserForm;
