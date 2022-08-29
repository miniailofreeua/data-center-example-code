/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';

type GetThisMonthOption = 'arr' | 'obj';

export default new (class GetCurrentDateService {
  getStartOfMonth() {
    const startOfMonth = moment().startOf('month').toDate();

    return startOfMonth;
  }

  getEndOfMonth() {
    const endOfMonth = moment().endOf('month').toDate();

    return endOfMonth;
  }

  format(date: string, format?: string): string {
    if (format) {
      return moment(date).format(format);
    }
    return moment(date).format();
  }

  getStartAndEndDateOfCurrentMonth(
    option: GetThisMonthOption,
  ): string[] | Object {
    const startOfMonth = this.getStartOfMonth();
    const endOfMonth = this.getEndOfMonth();

    if (option === 'arr') return [startOfMonth, endOfMonth];

    return { startOfMonth, endOfMonth };
  }
})();
