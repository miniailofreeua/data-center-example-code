import React, { useCallback } from 'react';
import { snakeCase, debounce } from 'lodash';

export const FormText = ({
  value,
  max,
  min,
  label,
  type,
  required,
  disabled,
  step,
  onChange,
  id,
  name,
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
    <div>
      <input
        // set similar min height with date input
        style={{
          minHeight: '38px',
        }}
        name={name}
        id={`text-input-${snakeCase(id || name || label)}`}
        defaultValue={defaultValue}
        value={value}
        className={'form-control pr-1'}
        placeholder={label}
        type={type}
        required={required}
        disabled={disabled}
        step={step}
        max={max}
        min={min}
        onChange={handleChange}
      />
    </div>
  );
};
