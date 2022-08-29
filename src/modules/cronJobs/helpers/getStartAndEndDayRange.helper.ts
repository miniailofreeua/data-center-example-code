import moment from 'moment';

export default () => {
  const dayStart = moment().hour(0).minute(0).second(1);
  const dayEnd = moment().hour(23).minute(59).second(59);
  return [dayStart, dayEnd];
};
