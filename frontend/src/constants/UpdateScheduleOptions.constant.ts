const getSecondsByHours = (hours: number) => `${hours * 60 * 60}`;

export const UpdateScheduleOptions = [
  {
    label: 'Every 5 minutes (Only for test!)',
    value: `${5 * 60}`,
  },
  {
    label: 'Every hour',
    value: getSecondsByHours(1),
  },
  {
    label: 'Every 2 hours',
    value: getSecondsByHours(2),
  },
  {
    label: 'Every 3 hours',
    value: getSecondsByHours(3),
  },
  {
    label: 'Every 5 hours',
    value: getSecondsByHours(5),
  },
  {
    label: 'Every 8 hours',
    value: getSecondsByHours(8),
  },
  {
    label: 'Every 12 hours',
    value: getSecondsByHours(12),
  },
  {
    label: 'Every 17 hours',
    value: getSecondsByHours(17),
  },
  {
    label: 'Every 24 hours',
    value: getSecondsByHours(24),
  },
  {
    label: 'Every 2 days (48h)',
    value: getSecondsByHours(48),
  },
];
