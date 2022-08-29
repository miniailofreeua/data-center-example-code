import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReactTable } from '../../../components';
import { UpdateScheduleOptions } from '../../../constants/UpdateScheduleOptions.constant';

const makeColumns = ({
  onBrandUpdateApiRemoveClick,
  onBrandUpdateApiEditClick,
}) => [
  {
    id: 'name',
    text: 'Name',
    dataField: 'name',
  },
  {
    id: 'domain',
    text: 'Domain',
    dataField: 'domain',
  },
  {
    id: 'apiUrl',
    text: 'API URL',
    dataField: 'apiUrl',
  },
  {
    id: 'runEverySeconds',
    text: 'Schedule',
    dataField: 'runEverySeconds',
    formatter: (runEverySeconds) =>
      UpdateScheduleOptions.find((o) => o.value === runEverySeconds)?.label,
  },
  {
    id: 'edit',
    text: 'Edit',
    dataField: 'edit',
    formatter: (id, brandUpdateApi) => (
      <FontAwesomeIcon
        opacity={1}
        icon={faEdit}
        cursor={'pointer'}
        onClick={() =>
          onBrandUpdateApiEditClick({ brandUpdateApi, isEdit: true })
        }
      />
    ),
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
        onClick={
          onBrandUpdateApiRemoveClick && (() => onBrandUpdateApiRemoveClick(id))
        }
      />
    ),
  },
];

export const BrandUpdateApisTable = ({
  isEdit,
  formUserRole,
  data,
  onBrandUpdateApiRemoveClick,
  onBrandUpdateApiEditClick,
}) => {
  const columns = React.useMemo(
    () =>
      makeColumns({
        onBrandUpdateApiRemoveClick,
        onBrandUpdateApiEditClick,
        formUserRole,
        isEdit,
      }),
    [
      isEdit,
      onBrandUpdateApiRemoveClick,
      onBrandUpdateApiEditClick,
      formUserRole,
    ],
  );

  return (
    <ReactTable
      isStickyHeader
      columns={columns}
      tableId={'desks-table'}
      showPagination={false}
      defaultColumn={{}}
      data={data || []}
    />
  );
};
