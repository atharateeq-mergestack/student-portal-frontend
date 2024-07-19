import { formatDateTime } from 'utils/dateFormatter';

interface DateTimeDisplayProps {
  date: string;
};

const DateTimeDisplay = ({ date } : DateTimeDisplayProps) => {
  const { formattedDate, formattedTime } = formatDateTime(date);

  return (
    <div>
      <div>{formattedDate}</div>
      <div>at {formattedTime}</div>
    </div>
  );
};

export default DateTimeDisplay;
