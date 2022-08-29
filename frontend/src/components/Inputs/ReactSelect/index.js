import Select from 'react-select';

const ReactSelect = ({
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
  disabled,
}) => {
  return (
    <div>
      {label && <label for={name}>{label}</label>}
      <Select
        options={options}
        value={selectedOption}
        isDisabled={disabled}
        name={name}
        label={label}
        required={required}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        onChange={onChange}
        className="basic-single"
        classNamePrefix="select"
      />
    </div>
  );
};

export default ReactSelect;
