import moment from 'moment';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateName = (value) => /^[A-Za-z\-'\s0-9]+$/.test(value);
const isEmpty = (value) => value === 'Empty0';

const schema = {
  'Trader.ID': {
    fieldName: 'crmTraderId',
    defaultValue: '',
    dataType: 'string',
    modify: Number,
    required: true,
  },
  'Trader.Import ID': {
    fieldName: 'importId',
    defaultValue: '',
    dataType: 'string',
    required: true,
  },
  'Trader.First Name': {
    fieldName: 'firstName',
    defaultValue: '',
    dataType: 'string',
    validate: validateName,
    validationMessage: 'First Name can contain only characters and numbers',
    required: true,
  },
  'Trader.Last Name': {
    fieldName: 'lastName',
    defaultValue: '',
    dataType: 'string',
    validate: validateName,
    validationMessage: 'Last Name can contain only characters and numbers',
    required: true,
  },
  'Trader.Email': {
    fieldName: 'email',
    defaultValue: '',
    dataType: 'string',
    modify: (value) => (value ? value.toLowerCase() : null),
    validate: (value) => emailRegex.test(value),
    validationMessage: 'Incorrect Email format',
    required: true,
  },
  'Trader.Phone': {
    fieldName: 'phone',
    defaultValue: null,
    dataType: 'string',
    required: true,
  },
  'Trader.Country': {
    fieldName: 'country',
    defaultValue: null,
    dataType: 'string',
    required: true,
  },
  'Trader.Sale Status': {
    fieldName: 'saleStatus',
    defaultValue: null,
    dataType: 'string',
    required: true,
  },
  'Trader.Balance': {
    fieldName: 'balance',
    defaultValue: '0',
    dataType: 'string',
    required: true,
  },
  'Trader.Source Company': {
    fieldName: 'sourceCompany',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  'Trader.Ftd Date': {
    fieldName: 'ftdDate',
    defaultValue: null,
    modify: (value) => {
      const date = value ? moment(value) : null;
      const isValid = date && date.isValid();
      return isEmpty(value) || !isValid ? null : date;
    },
    dataType: 'string',
    required: true,
  },
  'Trader.Is Ftd': {
    fieldName: 'ftd',
    defaultValue: null,
    modify: Number,
    dataType: 'string',
    required: true,
  },
  'Campaign.Campaign Name': {
    fieldName: 'campaignName',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  'Campaign.SubCampaign Name': {
    fieldName: 'subCampaignName',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  'Source Url': {
    fieldName: 'sourceUrl',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  'Registration Ip': {
    fieldName: 'registrationIp',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Language: {
    fieldName: 'language',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Param_1: {
    fieldName: 'param_1',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Param_2: {
    fieldName: 'param_2',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Param_3: {
    fieldName: 'param_3',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Param_4: {
    fieldName: 'param_4',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Param_5: {
    fieldName: 'param_5',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Param_6: {
    fieldName: 'param_6',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Param_7: {
    fieldName: 'param_7',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Param_8: {
    fieldName: 'param_8',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
  Param_9: {
    fieldName: 'param_9',
    defaultValue: null,
    modify: (value) => (isEmpty(value) ? null : value),
    dataType: 'string',
    required: true,
  },
};

export default schema;
