import { Form } from 'formik';
import { useMemo } from 'react';

import { DesksAutocomplete, FormField } from '../../components';
import './styles.scss';

const mapOptionToDbEntity = (option) => ({
  name: option.label,
  id: option.value,
});

const formFields = ({ values, userDesks, userBrands, setFieldValue }) =>
  [
    {
      id: 'deskId',
      name: 'deskId',
      label: 'Desk:',
      className: 'desk-field',
      component: DesksAutocomplete,
      customSetFieldValue: (option) =>
        setFieldValue('desk', mapOptionToDbEntity(option)),
      notInIds: (values.userDesks || []).map((d) => d.deskId),
      userBrands,
      userDesks,
      placeholder: 'Select Desk',
      isClearable: false,
      show: true,
    },
  ].filter(({ show }) => show);

const renderFormField = ({ show, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const AssignUserDeskForm = ({
  isEdit,
  values,
  loading,
  userDesks,
  userBrands,
  onFormClose,
  formUserRole,
  setFieldValue,
}) => {
  const fields = useMemo(
    () =>
      formFields({
        isEdit,
        values,
        userDesks,
        userBrands,
        formUserRole,
        setFieldValue,
      }).map(renderFormField),
    [isEdit, values, userDesks, userBrands, formUserRole, setFieldValue],
  );
  return (
    <Form className="user-desks-form" autoComplete="off">
      {fields}
      <div className="pr-form-buttons mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {isEdit ? 'Edit' : 'Save'}
        </button>
        <button
          onClick={onFormClose}
          type="button"
          className="btn btn-inverse m-l-1"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

export default AssignUserDeskForm;
