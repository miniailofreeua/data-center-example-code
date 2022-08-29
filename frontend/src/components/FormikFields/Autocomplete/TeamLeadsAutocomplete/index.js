import { useMemo } from 'react';
import { Users } from '../../../../API/api';
import AutocompleteField from '../AutocompleteField/AutocompleteField';

const optionsMapper = ({ firstName, lastName, id }) => ({
  label: `${firstName} ${lastName}`,
  value: id,
});

const TeamLeadsAutocomplete = (props) => {
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
      fetchDataCall={Users.preloadTeamLeadList}
      dataFetchFilterOptions={dataFetchFilterOptions}
      optionsMapper={optionsMapper}
    />
  );
};

export default TeamLeadsAutocomplete;
