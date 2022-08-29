import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReactTable } from '../../../../components';

const makeColumns = ({ onUserBrandRemoveClick }) =>
  [
    {
      id: 'name',
      text: 'Name',
      dataField: 'brand.name',
      show: true,
    },
    {
      id: 'remove',
      text: 'Remove',
      dataField: 'brandId',
      formatter: (id, userBrand) => (
        <FontAwesomeIcon
          opacity={1}
          icon={faTrash}
          cursor={'pointer'}
          onClick={
            onUserBrandRemoveClick && (() => onUserBrandRemoveClick(userBrand))
          }
        />
      ),
      show: true,
    },
  ].filter((c) => c.show);

export const BrandsTable = ({
  isEdit,
  formUserRole,
  data,
  onUserBrandRemoveClick,
}) => {
  const columns = React.useMemo(
    () =>
      makeColumns({
        onUserBrandRemoveClick,
        formUserRole,
        isEdit,
      }),
    [isEdit, onUserBrandRemoveClick, formUserRole],
  );

  return (
    <ReactTable
      columns={columns}
      tableId={'brands-table'}
      showPagination={false}
      defaultColumn={{}}
      data={data || []}
    />
  );
};
