import { format } from 'date-fns';

interface FormatDateTime {
  formattedDate: string;
  formattedTime: string;
}

export const formatDateTime = (dateString: string): FormatDateTime => {
  const date = new Date(dateString);
  const formattedDate = format(date, 'MMM dd, yyyy');
  const formattedTime = format(date, 'hh:mm a');
  return { formattedDate, formattedTime };
};
