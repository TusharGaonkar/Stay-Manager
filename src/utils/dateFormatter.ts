import { format, differenceInDays } from 'date-fns';

export const formatDateBookingDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "dd MMM yyyy 'at' h:m a");
};

export const formatDateGeneral = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'dd MMM yyyy');
};

export const calculateDistanceDates = (dateString: string) => {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  const daysDifference = differenceInDays(currentDate, givenDate);
  return daysDifference;
};
