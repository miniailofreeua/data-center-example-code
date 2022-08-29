import moment from 'moment-timezone';
import React from 'react';
import { DATE_FORMAT } from '../../../enums';

const DatePicker = ({
  name,
  onDateSelect,
  placeholder,
  value,
  defaultValue,
  required,
  form,
  field,
}) => {
  const handleChange = (form, field) => (value) => {
    form.setFieldValue(field.name, value.target.value);
  };
  return (
    <div className={'form-group'}>
      <input
        onChange={handleChange(form, field)}
        name={name}
        placeholder={placeholder}
        value={
          value
            ? moment(value).format(DATE_FORMAT.LocalIsoTimeWithoutHour)
            : undefined
        }
        className="form-control"
        type="date"
        defaultValue={defaultValue}
        id="example-datetime-local-input"
      />
    </div>
  );
};

export default DatePicker;
