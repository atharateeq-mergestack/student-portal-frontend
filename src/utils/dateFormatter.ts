import moment from 'moment';

interface FormatDateTime {
  formattedDate: string;
  formattedTime: string;
}

export const formatDateTime_MonthDayYear_HourMinute_AMPM = (dateString: string): FormatDateTime => {
  const date = moment(dateString);
  const formattedDate = date.format('MMM DD, YYYY');
  const formattedTime = date.format('hh:mm A');
  return { formattedDate, formattedTime };
};
