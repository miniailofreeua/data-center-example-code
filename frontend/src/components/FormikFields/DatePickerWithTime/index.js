import moment from 'moment-timezone';
import { DATE_FORMAT } from '../../../enums';

const DatePickerWithTime = ({
  name,
  onDateSelect,
  placeholder,
  value,
  defaultValue,
  required,
  form,
  field,
  disabled,
}) => {
  const handleChange = (form, field) => (value) => {
    form.setFieldValue(field.name, value.target.value);
  };
  return (
    <div>
      <input
        onChange={handleChange(form, field)}
        name={name}
        // required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={
          value ? moment(value).format(DATE_FORMAT.LocalIsoTime) : undefined
        }
        className="form-control"
        type="datetime-local"
        defaultValue={defaultValue}
        id="example-datetime-local-input"
      />
    </div>
  );
};

export default DatePickerWithTime;
