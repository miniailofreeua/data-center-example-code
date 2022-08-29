import { useMemo } from 'react';
import { Brands } from '../../../../API/api';
import AutocompleteField from '../AutocompleteField/AutocompleteField';

const optionsMapper = ({ name, id }) => ({ label: name, value: id });

const BrandsAutocomplete = (props) => {
  const dataFetchFilterOptions = useMemo(() => ({ $take: 15 }), []);

  return (
    <AutocompleteField
      {...props}
      fetchDataCall={Brands.getBrandsRequest}
      dataFetchFilterOptions={dataFetchFilterOptions}
      optionsMapper={optionsMapper}
    />
  );
};

export default BrandsAutocomplete;
