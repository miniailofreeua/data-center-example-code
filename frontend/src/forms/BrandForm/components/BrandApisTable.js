import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReactTable } from '../../../components';

const makeColumns = ({ onBrandApiRemoveClick, onBrandApiEditClick }) =>
  [
    {
      id: 'edit',
      text: 'Edit',
      dataField: 'edit',
      formatter: (id, brandApi) => (
        <FontAwesomeIcon
          opacity={1}
          icon={faEdit}
          cursor={'pointer'}
          onClick={() => onBrandApiEditClick({ brandApi, isEdit: true })}
        />
      ),
      show: true,
    },
    {
      id: 'remove',
      text: 'Remove',
      dataField: 'id',
      formatter: (id) => (
        <FontAwesomeIcon
          opacity={1}
          icon={faTrash}
          cursor={'pointer'}
          onClick={onBrandApiRemoveClick && (() => onBrandApiRemoveClick(id))}
        />
      ),
      show: true,
    },
  ].filter((c) => c.show);

export const BrandApisTable = ({
  isEdit,
  formUserRole,
  data,
  onBrandApiRemoveClick,
  onBrandApiEditClick,
}) => {
  const columns = React.useMemo(
    () =>
      makeColumns({
        onBrandApiRemoveClick,
        onBrandApiEditClick,
        formUserRole,
        isEdit,
      }),
    [isEdit, onBrandApiRemoveClick, onBrandApiEditClick, formUserRole],
  );

  return (
    <ReactTable
      columns={columns}
      tableId={'brand-apis-table'}
      showPagination={false}
      defaultColumn={{}}
      data={data || []}
    />
  );
};
