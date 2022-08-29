import moment from 'moment';
import {
  faUser,
  faUserCircle,
  faUserFriends,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import MoreBtn from '../../../components/Common/MoreBtn';
import CustomLink from '../../../components/Common/CustomLink';

import { UserRole } from '../../../enums';
import { hashing } from '../../../services/hash';

const userRole = localStorage.getItem('userRole');

const TradersColumnList = ({
  dispatch,
  openAssignDesk,
  openAssignCompany,
  openAssignTeamLeadAndAgent,
}) =>
  [
    {
      Header: 'ID',
      sticky: 'left',
      accessor: 'id',
      disableResizing: true,
      maxWidth: 80,
      minWidth: 80,
      Cell: ({ row: { original } }) =>
        userRole !== UserRole.Admin ? (
          original?.id
        ) : (
          <CustomLink to={`traders/profile?id=${hashing(original.trader?.id)}`}>
            {original?.id}
          </CustomLink>
        ),
      show: true,
    },
    {
      Header: 'Actions',
      sticky: 'left',
      accessor: 'assignId',
      disableResizing: true,
      Cell: ({ row: { original } }) => (
        <div className="dropdown-menu-container">
          <MoreBtn
            actions={[
              {
                text: 'Assign Desk',
                icon: faWindowMaximize,
                onAction: () =>
                  openAssignDesk({
                    dispatch,
                    traderId: original.id,
                    deskId: original.deskId,
                  }),
                show: [UserRole.Company].includes(userRole),
              },
              {
                text: 'Assign Company',
                icon: faUserCircle,
                onAction: () =>
                  openAssignCompany({
                    dispatch,
                    traderId: original.id,
                    companyId: original?.companyId,
                  }),
                show: [UserRole.Admin, UserRole.SuperManager].includes(
                  userRole,
                ),
              },
              {
                text: [UserRole.TeamLead].includes(userRole)
                  ? 'Assign Agent'
                  : 'Assign TeamLead and Agent',
                icon: [UserRole.TeamLead].includes(userRole)
                  ? faUser
                  : faUserFriends,
                onAction: () =>
                  openAssignTeamLeadAndAgent({
                    dispatch,
                    traderId: original.id,
                    teamLeadId: original?.teamLeadId,
                    agentId: original?.agentId,
                  }),
                show: [
                  UserRole.TeamLead,
                  UserRole.CrmManager,
                  UserRole.DeskManager,
                ].includes(userRole),
              },
            ].filter(({ show }) => show)}
          />
        </div>
      ),
      maxWidth: 70,
      minWidth: 70,
      show: true,
    },
    {
      Header: 'Crm Trader ID',
      accessor: 'crmTraderId',
      Cell: ({ value }) => value,
      minWidth: 120,
      show: true,
    },
    {
      Header: 'Brand',
      accessor: 'brand',
      Cell: ({ value }) => value.name,
      minWidth: 200,
      show: true,
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
      minWidth: 150,
      show: true,
    },
    {
      Header: 'LastName',
      accessor: 'lastName',
      minWidth: 200,
      show: true,
    },
    {
      Header: 'Country',
      accessor: 'country',
      Cell: ({ row }) => row.original.trader?.country,
      show: true,
    },
    {
      Header: 'Language',
      accessor: 'language',
      Cell: ({ row }) => row.original.trader?.language,
      show: true,
    },
    {
      Header: 'Reg. Time',
      accessor: 'registeredAt',
      Cell: ({ row }) => (
        <>
          {row.original.trader?.registeredAt &&
            moment(row.original.trader?.registeredAt).format('ll')}
        </>
      ),
      minWidth: 130,
      show: true,
    },
    {
      Header: 'Last Login',
      accessor: 'lastLogin',
      Cell: ({ row }) => (
        <>
          {row.original.trader?.lastLogin &&
            moment(row.original.trader?.lastLogin).format('ll')}
        </>
      ),
      minWidth: 130,
      show: true,
    },
    {
      Header: 'Balance',
      accessor: 'balance',
      Cell: ({ row }) => row.original.balance,
      minWidth: 130,
      show: true,
    },
    {
      Header: 'Currency',
      accessor: 'currency',
      Cell: ({ row }) => row.original.trader?.currency,
      show: true,
    },
    {
      Header: 'Ftd',
      accessor: 'ftd',
      Cell: ({ value }) => value,
      show: true,
    },
    {
      Header: 'Lead ID',
      accessor: 'leadId',
      show: true,
    },
  ].filter(({ show }) => show);

export default TradersColumnList;
