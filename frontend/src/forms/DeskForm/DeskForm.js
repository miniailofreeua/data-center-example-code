import { Form } from 'formik';
import CustomLink from '../../components/Common/CustomLink';
import { BrandsAutocomplete, FormField } from '../../components';

const formFields = () =>
  [
    {
      id: 'name',
      name: 'name',
      label: 'Name:',
      type: 'text',
      className: 'form-control',
      placeholder: 'Name',
      show: true,
    },
    {
      id: 'brandId',
      name: 'brandId',
      label: 'Brand:',
      className: 'desk-field',
      component: BrandsAutocomplete,
      show: true,
    },
  ].filter(({ show }) => show);

const renderFormField = ({ show, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const DeskForm = ({ isEdit, loading }) => {
  return (
    <Form className="user-form" autoComplete="off">
      {formFields().map(renderFormField)}
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

export default DeskForm;
