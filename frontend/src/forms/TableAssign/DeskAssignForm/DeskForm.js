import { Form } from 'formik';

import { FormField } from '../../../components';
import { DesksAutocomplete } from '../../../components';

import './styles.scss';

const formFields = () =>
  [
    {
      id: 'deskId',
      name: 'deskId',
      label: 'Desk:',
      className: 'desk-field',
      component: DesksAutocomplete,
      show: true,
    },
  ].filter(({ show }) => show);

const renderFormField = ({ show, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const DeskForm = ({ isEdit, loading, onFormClose }) => {
  return (
    <Form className="desk-form" autoComplete="off">
      {formFields().map(renderFormField)}
      <div className="pr-form-buttons">
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

export default DeskForm;
