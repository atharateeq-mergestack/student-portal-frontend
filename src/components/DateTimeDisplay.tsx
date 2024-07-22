import { formatDateTime_MonthDayYear_HourMinute_AMPM } from 'utils/dateFormatter';

interface IDateTimeDisplayProps {
  date: string;
};

const DateTimeDisplay = ({ date } : IDateTimeDisplayProps) => {
  const { formattedDate, formattedTime } = formatDateTime_MonthDayYear_HourMinute_AMPM(date);

  return (
    <div>
      <div>{formattedDate}</div>
      <div>at {formattedTime}</div>
    </div>
  );
};

export default DateTimeDisplay;
