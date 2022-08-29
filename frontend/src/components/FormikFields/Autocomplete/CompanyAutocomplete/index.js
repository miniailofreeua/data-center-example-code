import { useMemo } from 'react';
import { Users } from '../../../../API/api';
import AutocompleteField from '../AutocompleteField/AutocompleteField';

const optionsMapper = ({ username, id }) => ({
  label: `${username}`,
  value: id,
});

const CompanyAutocomplete = (props) => {
  const { notInIds } = props;

  const dataFetchFilterOptions = useMemo(
    () => ({
      $take: 15,
      ...((notInIds || []).length > 0 && { notInIds }),
    }),
    [notInIds],
  );

  return (
    <AutocompleteField
      {...props}
      fetchDataCall={Users.preloadCompanyList}
      dataFetchFilterOptions={dataFetchFilterOptions}
      optionsMapper={optionsMapper}
    />
  );
};

export default CompanyAutocomplete;
