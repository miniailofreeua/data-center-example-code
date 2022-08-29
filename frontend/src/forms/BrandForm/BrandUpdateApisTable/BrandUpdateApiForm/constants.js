export const mandatoryUpdateFields = ['crmTraderId'];

export const initialQueryParams = [{}];

export const initialKeyToColumnMappings = mandatoryUpdateFields.map(
  (columnName) => ({
    key: undefined,
    columnName,
  }),
);
