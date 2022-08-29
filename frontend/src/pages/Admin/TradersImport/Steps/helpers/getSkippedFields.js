export const getSkippedFields = (trader, requiredFields) =>
  requiredFields
    .map((field) => !trader.hasOwnProperty(field) && field)
    .filter(Boolean);
