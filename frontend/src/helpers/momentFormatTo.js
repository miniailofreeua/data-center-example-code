import moment from 'moment-timezone';

export const momentFormatTo = (date, format) => {
  return date && moment(date).tz('Europe/Kiev').format(format);
};
