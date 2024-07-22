import { formatDateTime } from 'utils/dateFormatter';

interface IDateTimeDisplayProps {
  date: string;
};

const DateTimeDisplay = ({ date } : IDateTimeDisplayProps) => {
  const { formattedDate, formattedTime } = formatDateTime(date);

  return (
    <div>
      <div>{formattedDate}</div>
      <div>at {formattedTime}</div>
    </div>
  );
};

export default DateTimeDisplay;
