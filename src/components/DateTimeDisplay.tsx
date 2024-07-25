import { formatDateTime_MonthDayYear_HourMinute_AMPM } from 'utils/dateFormatter';

interface IDateTimeDisplayProps {
  date: string;
};

const DateTimeDisplay = ({ date } : IDateTimeDisplayProps) => {
  const { formattedDate, formattedTime } = formatDateTime_MonthDayYear_HourMinute_AMPM(date);

  return (
    <div>
      <div className='date-section'>{formattedDate}</div>
      <div className='time-section'>at {formattedTime}</div>
    </div>
  );
};

export default DateTimeDisplay;
