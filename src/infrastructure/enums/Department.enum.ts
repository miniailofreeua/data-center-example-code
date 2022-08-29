export enum Department {
  Conversion = 'conversion',
  Retention = 'retention',
}

export const DepartmentLabel = {
  [Department.Conversion]: 'Conversion',
  [Department.Retention]: 'Retention',
};

export const DepartmentListOptions = Object.entries(DepartmentLabel).map(
  ([departmentKey, departmentLabel]) => ({
    key: departmentKey,
    label: departmentLabel,
  }),
);
