import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReactTable } from '../../../components';

const makeColumns = ({ onTeamLeadsRemoveClick }) =>
  [
    {
      id: 'teamLeadId',
      text: 'Id',
      dataField: 'teamLeadId',
      show: true,
      formatter: (teamLeadId) => <span>{teamLeadId}</span>,
    },
    {
      id: 'teamLeadName',
      text: 'TeamLead',
      dataField: 'teamLead',
      show: true,
      formatter: ({ firstName, lastName, name }) => (
        <span>{name || `${firstName} ${lastName}`}</span>
      ),
    },
    {
      id: 'remove',
      text: 'Remove',
      dataField: 'teamLeadId',
      formatter: (id, teamLead) => (
        <FontAwesomeIcon
          opacity={1}
          icon={faTrash}
          cursor={'pointer'}
          onClick={
            onTeamLeadsRemoveClick && (() => onTeamLeadsRemoveClick(teamLead))
          }
        />
      ),
      show: true,
    },
  ].filter((c) => c.show);

export const TeamLeadsTable = ({ data, onTeamLeadsRemoveClick }) => {
  const columns = React.useMemo(
    () =>
      makeColumns({
        onTeamLeadsRemoveClick,
      }),
    [onTeamLeadsRemoveClick],
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
