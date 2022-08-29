import { useCallback, useEffect, useState } from 'react';
import { AvField } from 'availity-reactstrap-validation';
import ReactSelect from '../ReactSelect';
import AsyncReactSelect from '../AsyncReactSelect';
import debounce from 'debounce-promise';

const AvReactSelect = ({
  name,
  label,
  defaultValue,
  options,
  disabled,
  isSearchable = true,
  required,
  isClearable,
  isLoading,
  placeholder,
  onChange,
  loadOptions,
  onInputChangeFetchRequest,
}) => {
  const [selectedOption, setSelectedOption] = useState();

  const debouncedFunction = debounce(async (value) => {
    return await loadOptions(value);
  }, 500);

  const fetchOnInputChange = useCallback(
    async (value) =>
      await onInputChangeFetchRequest({ value, debouncedFunction, name }),

    [debouncedFunction, name, onInputChangeFetchRequest],
  );

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
    setSelectedOption(value);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(
        options.find((option) => option.value === defaultValue),
      );
    }
  }, [options, defaultValue]);

  const reactSelectOptions = {
    placeholder,
    options,
    isSearchable,
    isClearable,
    isLoading,
    disabled,
    onChange: handleChange,
  };

  return (
    <AvField
      name={name}
      label={label}
      tag={() =>
        loadOptions ? (
          <AsyncReactSelect
            {...reactSelectOptions}
            name={name}
            selectedOption={selectedOption}
            onLoadOptions={fetchOnInputChange}
          />
        ) : (
          <ReactSelect
            name={name}
            {...reactSelectOptions}
            selectedOption={selectedOption}
          />
        )
      }
      value={selectedOption && selectedOption.value}
      className="form-control"
      placeholder={placeholder}
      type="select"
      required={required}
      options={options}
    />
  );
};

export default AvReactSelect;
