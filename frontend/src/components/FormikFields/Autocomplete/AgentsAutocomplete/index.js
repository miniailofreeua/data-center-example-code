import { useMemo } from 'react';
import { Users } from '../../../../API/api';
import { UserRole } from '../../../../enums';
import AutocompleteField from '../AutocompleteField/AutocompleteField';

const optionsMapper = ({ firstName, lastName, id }) => ({
  label: `${firstName} ${lastName}`,
  value: id,
});

const AgentsAutocomplete = (props) => {
  const { notInIds, teamLeadId } = props;
  const dataFetchFilterOptions = useMemo(
    () => ({
      $take: 15,
      role: UserRole.Agent,
      ...((notInIds || []).length > 0 && { notInIds }),
      ...(teamLeadId && { teamLeadId }),
    }),
    [notInIds, teamLeadId],
  );

  return (
    <AutocompleteField
      {...props}
      fetchDataCall={Users.preloadAgentList}
      dataFetchFilterOptions={dataFetchFilterOptions}
      optionsMapper={props.optionsMapper ? props.optionsMapper : optionsMapper}
    />
  );
};

export default AgentsAutocomplete;
