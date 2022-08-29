import { Form } from 'formik';
import { useMemo } from 'react';
import { BrandsAutocomplete, FormField } from '../../components';
import './styles.scss';

const mapOptionToDbEntity = (option) => {
  return {
    name: option.label,
    id: option.value,
  };
};

const formFields = ({ userBrands, setFieldValue }) =>
  [
    {
      id: 'brandId',
      name: 'brandId',
      label: 'Brand:',
      className: 'brand-field',
      component: BrandsAutocomplete,
      customSetFieldValue: (option) =>
        setFieldValue('brand', mapOptionToDbEntity(option)),
      notInIds: (userBrands || []).map((d) => d.brandId),
      placeholder: 'Select Brand',
      isClearable: false,
      show: true,
    },
  ].filter(({ show }) => show);

const renderFormField = ({ show, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const AssignUserBrandsForm = ({
  isEdit,
  setFieldValue,
  onFormClose,
  userBrands,
  formUserRole,
  loading,
}) => {
  const fields = useMemo(
    () =>
      formFields({
        isEdit,
        setFieldValue,
        userBrands,
        formUserRole,
      }).map(renderFormField),
    [isEdit, userBrands, formUserRole, setFieldValue],
  );
  return (
    <Form className="user-brands-form" autoComplete="off">
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

export default AssignUserBrandsForm;
