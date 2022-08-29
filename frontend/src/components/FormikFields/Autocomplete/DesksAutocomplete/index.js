import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Desks } from '../../../../API/api';
import AutocompleteField from '../AutocompleteField/AutocompleteField';

const optionsMapper = ({ name, id }) => ({ label: name, value: Number(id) });

const DesksAutocomplete = (props) => {
  const { notInIds } = props;

  const {
    user: { userBrands, userDesks },
  } = useSelector((state) => state.GetCurrentUser);

  const inBrands = useMemo(
    () => userBrands?.map(({ brandId }) => brandId),
    [userBrands],
  );
  const inDesks = useMemo(
    () => userDesks?.map(({ deskId }) => deskId),
    [userDesks],
  );

  const dataFetchFilterOptions = useMemo(
    () => ({
      $take: 15,
      ...((notInIds || []).length > 0 && { notInIds }),
      ...((inBrands || []).length > 0 && { inBrands }),
      ...((inDesks || []).length > 0 && { inDesks }),
    }),
    [notInIds, inBrands, inDesks],
  );
  return (
    <AutocompleteField
      {...props}
      fetchDataCall={Desks.getDesksRequest}
      dataFetchFilterOptions={dataFetchFilterOptions}
      optionsMapper={optionsMapper}
    />
  );
};

export default DesksAutocomplete;
