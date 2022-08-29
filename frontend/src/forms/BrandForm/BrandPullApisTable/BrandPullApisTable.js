import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReactTable } from '../../../components';
import { UpdateScheduleOptions } from '../../../constants/UpdateScheduleOptions.constant';

const makeColumns = ({
  onBrandPullApiRemoveClick,
  onBrandPullApiEditClick,
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
    formatter: (id, brandPullApi) => (
      <FontAwesomeIcon
        opacity={1}
        icon={faEdit}
        cursor={'pointer'}
        onClick={() => onBrandPullApiEditClick({ brandPullApi, isEdit: true })}
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
          onBrandPullApiRemoveClick && (() => onBrandPullApiRemoveClick(id))
        }
      />
    ),
  },
];

export const BrandPullApisTable = ({
  isEdit,
  formUserRole,
  data,
  onBrandPullApiRemoveClick,
  onBrandPullApiEditClick,
}) => {
  const columns = React.useMemo(
    () =>
      makeColumns({
        onBrandPullApiRemoveClick,
        onBrandPullApiEditClick,
        formUserRole,
        isEdit,
      }),
    [isEdit, onBrandPullApiRemoveClick, onBrandPullApiEditClick, formUserRole],
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
