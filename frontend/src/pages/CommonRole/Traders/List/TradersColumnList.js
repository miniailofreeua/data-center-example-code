import moment from 'moment';
import CustomLink from '../../../../components/Common/CustomLink';
import { hashing } from '../../../../services/hash';

const InfoColumnPrefill = [
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

const columnIdPrefill = [
  {
    Header: 'ID',
    sticky: 'left',
    accessor: 'id',
    disableResizing: true,
    maxWidth: 80,
    minWidth: 80,
    Cell: ({ row }) => (
      <CustomLink to={`traders/profile?id=${hashing(row.original.trader?.id)}`}>
        {row.original?.id}
      </CustomLink>
    ),
  },
];

const TradersColumnList = [...columnIdPrefill, ...InfoColumnPrefill];

export default TradersColumnList;
