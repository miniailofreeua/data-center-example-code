import React from 'react';
import PropTypes from 'prop-types';
import { SelectFormFieldFormik } from '../../..';
import useTypeAheadFetchHook from '../../../../hooks/useTypeAheadFetchHook/useTypeAheadFetchHook';

const AutocompleteField = (props) => {
  const {
    field,
    dataFetchFilterOptions,
    optionsMapper,
    optionsSort,
    fetchDataCall,
    isClearable,
    setInitialDefaultOption,
  } = props;
  const {
    state: { isLoading, isError, options },
    handleInputChange,
  } = useTypeAheadFetchHook({
    optionsFetchPromise: fetchDataCall,
    selectedOption: field.value,
    filterOptions: dataFetchFilterOptions,
    selectOptionsMapper: optionsMapper,
    selectOptionsSort: optionsSort,
  });

  if (isError) {
    console.warn('Error on users autocomplete loading');
  }

  if (
    setInitialDefaultOption &&
    !isClearable &&
    !field.value &&
    options.length
  ) {
    const { setFieldValue } = props.form;
    setFieldValue(field.name, options[0].value);
  }
  return (
    <SelectFormFieldFormik
      {...props}
      isLoading={isLoading}
      options={options}
      onInputChange={handleInputChange}
    />
  );
};

AutocompleteField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dataFetchFilterOptions: PropTypes.object,
  fetchDataCall: PropTypes.func.isRequired,
  optionsMapper: PropTypes.func,
  placeholder: PropTypes.string,
};

export default AutocompleteField;
