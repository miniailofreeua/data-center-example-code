import { ErrorMessage, Field } from 'formik';
import { FormikError } from '../../index';
import classNames from 'classnames';

const FormField = ({
  component,
  name,
  label,
  type,
  customClassName,
  ...restProps
}) => (
  <div className={classNames('form-group', customClassName)}>
    <label>{label}</label>
    <Field
      name={name}
      {...(component && { component })}
      {...(type && { type })}
      {...restProps}
    />
    <ErrorMessage component={FormikError} name={name} />
  </div>
);

export default FormField;
