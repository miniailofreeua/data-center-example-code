export enum DeskDepartment {
  Conversion = 'conversion',
  Retention = 'retention',
  ConversionAndRetention = 'conversionAndRetention',
}

export const DeskDepartmentLabel = {
  [DeskDepartment.Conversion]: 'Conversion',
  [DeskDepartment.Retention]: 'Retention',
  [DeskDepartment.ConversionAndRetention]: 'Conversion and Retention',
};

export const DeskDepartmentListOptions = Object.entries(
  DeskDepartmentLabel,
).map(([value, label]) => ({
  value,
  label,
}));
