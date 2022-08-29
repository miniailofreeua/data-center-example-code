import React from 'react';
import { AvField } from 'availity-reactstrap-validation';
import { debounce } from 'lodash';

import { ReactComponent as CancelLogo } from '../../assets/images/fields/cancel.svg';

const FormText = ({
  name,
  label,
  placeholder,
  type,
  //
  value,
  max,
  min,
  required,
  disabled,
  onChange,
  id,
  defaultValue,
}) => {
  const debouncedValueLogging = debounce(onChange, 400);

  const handleChange = useCallback(
    (event) => {
      const value = event.target.value.trim();
      debouncedValueLogging(value);
    },
    [debouncedValueLogging],
  );

  return (
    <div className="mb-3" style={{ width: '220px', marginRight: '3px' }}>
      <div style={{ position: 'relative' }}>
        <AvField
          id={id}
          key={id}
          name={name}
          label={label}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          required={required}
          type={type}
          className="form-control"
          placeholder={placeholder}
          max={max}
          min={min}
        />
        {filterOptions[name] && (
          <div className="fieldCancel" onClick={() => handleRemove({ name })}>
            <CancelLogo />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormText;
