import Select from 'react-select';

const getOptionValue = (option) => (option ? option.value : null);
const getMultiOptionValues = (options) =>
  options ? options.map(getOptionValue) : null;

const handleChange =
  (form, field, isMulti, customSetFieldValue) => (option) => {
    const fieldValue = isMulti
      ? getMultiOptionValues(option)
      : getOptionValue(option);
    form.setFieldValue(field.name, fieldValue);
    customSetFieldValue && customSetFieldValue(option);
  };

const SelectFormField = ({
  id,
  placeholder,
  field,
  form,
  options = [],
  isMulti = false,
  isLoading = false,
  onInputChange,
  isClearable = false,
  disabled = false,
  onBlur,
  filterOption,
  maxMenuHeight,
  selectedOption,
  customSetFieldValue,
}) => {
  const getValue = () => {
    if (options && options.length) {
      return isMulti && field.value
        ? options.filter((o) => field.value.indexOf(o.value) >= 0)
        : options.find((o) => o.value === field.value) || '';
    } else {
      return isMulti ? [] : '';
    }
  };

  return (
    <Select
      inputId={id}
      name={field.name}
      value={selectedOption || getValue()}
      onChange={handleChange(form, field, isMulti, customSetFieldValue)}
      onBlur={onBlur}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      isLoading={isLoading}
      onInputChange={onInputChange}
      isClearable={isClearable}
      isDisabled={disabled}
      maxMenuHeight={maxMenuHeight}
      {...(filterOption ?? { filterOption })}
    />
  );
};

export default SelectFormField;
