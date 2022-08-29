import { DATE_FORMAT } from '../../../enums';
import { momentFormatTo } from '../../../helpers/momentFormatTo';

const TradersProfileColumnList = [
  {
    text: 'Id',
    dataField: 'id',
    style: {
      maxWidth: 60,
      minWidth: 60,
      justifyContent: 'center',
    },
    headerStyle: {
      maxWidth: 60,
      minWidth: 60,
      justifyContent: 'center',
    },
    show: true,
  },
  {
    text: 'Brand',
    dataField: 'brand',
    formatter: (brand) => <>{brand.name}</>,
    style: {
      maxWidth: 170,
      minWidth: 170,
    },
    headerStyle: {
      maxWidth: 170,
      minWidth: 170,
    },
    show: true,
  },
  {
    text: 'First Name',
    dataField: 'firstName',
    style: {
      maxWidth: 170,
      minWidth: 170,
    },
    headerStyle: {
      maxWidth: 170,
      minWidth: 170,
    },
    show: true,
  },
  {
    text: 'LastName',
    dataField: 'lastName',
    style: {
      maxWidth: 170,
      minWidth: 170,
    },
    headerStyle: {
      maxWidth: 170,
      minWidth: 170,
    },
    show: true,
  },
  {
    text: 'CRM ID',
    dataField: 'crmTraderId',
    show: true,
  },
  {
    text: 'Affiliate ID',
    dataField: 'affiliateId',
    show: true,
  },
  {
    text: 'Import ID',
    dataField: 'importId',
    show: true,
  },

  {
    text: 'Country',
    dataField: 'country',
    style: {
      maxWidth: 120,
      minWidth: 120,
    },
    headerStyle: {
      maxWidth: 120,
      minWidth: 120,
    },
    show: true,
  },
  {
    text: 'Campaign',
    dataField: 'campaignName',
    style: {
      maxWidth: 170,
      minWidth: 170,
    },
    headerStyle: {
      maxWidth: 170,
      minWidth: 170,
    },
    show: true,
  },
  {
    text: 'SubCampaign',
    dataField: 'subCampaignName',
    style: {
      maxWidth: 170,
      minWidth: 170,
    },
    headerStyle: {
      maxWidth: 170,
      minWidth: 170,
    },
    show: true,
  },
  {
    text: 'Source Company',
    dataField: 'sourceCompany',
    style: {
      maxWidth: 170,
      minWidth: 170,
    },
    headerStyle: {
      maxWidth: 170,
      minWidth: 170,
    },
    show: true,
  },
  {
    text: 'Balance',
    dataField: 'balance',
    show: true,
  },
  {
    text: 'Sale Status',
    dataField: 'saleStatus',
    show: true,
  },
  {
    text: 'FTD',
    dataField: 'ftd',
    show: true,
  },
  {
    text: 'FTD DATE',
    dataField: 'ftdDate',
    formatter: (ftdDate) => (
      <>{momentFormatTo(ftdDate, DATE_FORMAT.DateTime24WithoutHour)}</>
    ),
    show: true,
  },
  {
    text: 'LDD DATE',
    dataField: 'lastDepositDate',
    formatter: (lastDepositDate) => (
      <>{momentFormatTo(lastDepositDate, DATE_FORMAT.DateTime24WithoutHour)}</>
    ),
    show: true,
  },
  {
    text: 'Last Login',
    dataField: 'lastLoginAt',
    formatter: (lastLoginAt) => (
      <>{momentFormatTo(lastLoginAt, DATE_FORMAT.DateTime24WithoutHour)}</>
    ),
    show: true,
  },
].filter(({ show }) => show);

export default TradersProfileColumnList;
