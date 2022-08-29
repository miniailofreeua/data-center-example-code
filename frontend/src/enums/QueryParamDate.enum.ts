import moment from 'moment';
import { DATE_FORMAT } from './DateFormat.enum';

export enum QueryParamDate {
  From_Day_Month_Year = 'from_DD/MM/YYYY',
  To_Day_Month_Year = 'to_DD/MM/YYYY',
  in20Range = 'in%20date%20range',
}

export const QueryParamDateLabel = {
  [QueryParamDate.From_Day_Month_Year]: 'From in DD/MM/YYYY format',
  [QueryParamDate.To_Day_Month_Year]: 'To in DD/MM/YYYY format',
  [QueryParamDate.in20Range]: 'in%20date%20range',
};

export const QueryParamDateListOptions = Object.entries(
  QueryParamDateLabel,
).map(([value, label]) => ({
  value,
  label,
}));

export const QueryParamDateValueList = QueryParamDateListOptions.map(
  (value) => value.value,
);

export const getDateFromQueryParamDateEnum = (value: QueryParamDate) => {
  switch (value) {
    case QueryParamDate.From_Day_Month_Year: {
      return moment().hour(0).minute(0).format(DATE_FORMAT.Day_Month_Year);
    }
    case QueryParamDate.To_Day_Month_Year: {
      return moment()
        .hour(23)
        .minute(59)
        .second(59)
        .format(DATE_FORMAT.Day_Month_Year);
    }
    case QueryParamDate.in20Range: {
      return `20${moment().format(
        DATE_FORMAT.Year_Month_Day,
      )}%2000:00:00%20-%20${moment().format(
        DATE_FORMAT.Year_Month_Day,
      )}%2023:59:59`;
    }
  }
};
