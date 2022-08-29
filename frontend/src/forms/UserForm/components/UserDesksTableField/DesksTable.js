import React from 'react';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactTable } from '../../../../components';

const makeColumns = ({ onUserDeskRemoveClick }) =>
  [
    {
      id: 'name',
      text: 'Name',
      dataField: 'desk.name',
      show: true,
    },
    {
      id: 'remove',
      text: 'Remove',
      dataField: 'deskId',
      formatter: (id, userDesk) => (
        <FontAwesomeIcon
          opacity={1}
          icon={faTrash}
          cursor={'pointer'}
          onClick={
            onUserDeskRemoveClick && (() => onUserDeskRemoveClick(userDesk))
          }
        />
      ),
      show: true,
    },
  ].filter((c) => c.show);

export const DesksTable = ({
  isEdit,
  formUserRole,
  data,
  onUserDeskRemoveClick,
}) => {
  const columns = React.useMemo(
    () =>
      makeColumns({
        onUserDeskRemoveClick,
        formUserRole,
        isEdit,
      }),
    [isEdit, onUserDeskRemoveClick, formUserRole],
  );

  return (
    <ReactTable
      columns={columns}
      tableId={'desks-table'}
      showPagination={false}
      defaultColumn={{}}
      data={data || []}
    />
  );
};
