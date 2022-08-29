export enum Department {
  Conversion = 'conversion',
  Retention = 'retention',
}

export const DepartmentLabel = {
  [Department.Conversion]: 'Conversion',
  [Department.Retention]: 'Retention',
};

export const DepartmentListOptions = Object.entries(DepartmentLabel).map(
  ([value, label]) => ({
    value,
    label,
  }),
);
