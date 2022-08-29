import AsyncSelect from 'react-select/async';

const AsyncReactSelect = ({
  name,
  label,
  selectedOption,
  options,
  isSearchable = true,
  required,
  isClearable,
  isLoading,
  placeholder,
  onChange,
  onLoadOptions,
  disabled,
}) => {
  return (
    <>
      {label && <label for={name}>{label}</label>}
      <AsyncSelect
        defaultOptions={options}
        loadOptions={onLoadOptions}
        value={selectedOption}
        name={name}
        label={label}
        isDisabled={disabled}
        required={required}
        isLoading={isLoading}
        isClearable={isClearable}
        placeholder={placeholder}
        onChange={onChange}
        className="basic-single"
        classNamePrefix="select"
      />
    </>
  );
};

export default AsyncReactSelect;
