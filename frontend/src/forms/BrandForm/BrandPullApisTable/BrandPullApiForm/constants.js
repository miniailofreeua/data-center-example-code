export const mandatoryPullFields = [
  'crmTraderId',
  'firstName',
  'lastName',
  'email',
  'phone',
];

export const initialQueryParams = [{}];

export const initialKeyToColumnMappings = mandatoryPullFields.map(
  (columnName) => ({
    key: undefined,
    columnName,
  }),
);
