import supabase from './supabaseClient';
import {
  subMonths,
  startOfWeek,
  startOfYear,
  eachMonthOfInterval,
  parseISO,
  eachDayOfInterval,
  format,
  endOfYear,
} from 'date-fns';

export default async function getTotalBookingStats(range: string) {
  let modifiedData = {};
  const currentDate = new Date();

  switch (range) {
    case 'This Year':
      try {
        const startOfYearDate = startOfYear(currentDate);
        const endOfYearDate = endOfYear(currentDate);
        const { data, error } = await supabase
          .from('bookings')
          .select('startDate , endDate')
          .gte('startDate', startOfYearDate.toISOString())
          .lte('endDate', endOfYearDate.toISOString());
        if (error) throw error;

        const individualMonthData = {};
        data?.forEach((booking) => {
          const bookingMonth = format(parseISO(booking.startDate), 'MMM');
          individualMonthData[bookingMonth] = (individualMonthData[bookingMonth] || 0) + 1;
        });

        const allMonths = eachMonthOfInterval({
          start: startOfYearDate,
          end: endOfYearDate,
        });

        allMonths.forEach((month) => {
          const getMonth = format(month, 'MMM');
          individualMonthData[getMonth]
            ? (modifiedData[getMonth] = individualMonthData[getMonth])
            : (modifiedData[getMonth] = 0);
        });

        const result = Object.keys(modifiedData).map((key) => {
          return {
            name: key,
            'Total Bookings': modifiedData[key],
          };
        });

        return result;
      } catch (error) {
        throw new Error(error.message);
      }

    case 'Past 6 Months':
      try {
        const sixMonthsAgo = subMonths(currentDate, 6);
        const { data, error } = await supabase
          .from('bookings')
          .select('startDate , endDate')
          .gte('startDate', sixMonthsAgo.toISOString())
          .lte('endDate', currentDate.toISOString());

        if (error) throw error;

        const individualMonthData = {};
        data?.forEach((booking) => {
          const bookingMonth = format(parseISO(booking.startDate), 'MMM');
          individualMonthData[bookingMonth] = (individualMonthData[bookingMonth] || 0) + 1;
        });

        const allMonths = eachMonthOfInterval({
          start: sixMonthsAgo,
          end: currentDate,
        });

        allMonths.forEach((month) => {
          const getMonth = format(month, 'MMM');
          individualMonthData[getMonth]
            ? (modifiedData[getMonth] = individualMonthData[getMonth])
            : (modifiedData[getMonth] = 0);
        });

        const result = Object.keys(modifiedData).map((key) => {
          return {
            name: key,
            'Total Bookings': modifiedData[key],
          };
        });

        return result;
      } catch (error) {
        throw new Error(error.message);
      }
      break;

    case 'Last Month':
      try {
        const lastMonth = subMonths(currentDate, 1);
        const { data, error } = await supabase
          .from('bookings')
          .select('startDate , endDate')
          .gte('startDate', lastMonth.toISOString())
          .lte('endDate', currentDate.toISOString());

        if (error) throw error;
        const individualDaysData = {};
        data?.forEach((booking) => {
          const bookingDay = format(parseISO(booking.startDate), 'd');
          individualDaysData[bookingDay] = (individualDaysData[bookingDay] || 0) + 1;
        });

        const individualDays = eachDayOfInterval({
          start: lastMonth,
          end: currentDate,
        });

        const result = individualDays.map((day) => {
          const getDay = format(day, 'd');
          if (individualDaysData[getDay]) {
            return {
              name: getDay,
              'Total Bookings': individualDaysData[getDay],
            };
          }
          return {
            name: getDay,
            'Total Bookings': 0,
          };
        });
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
      break;
    case 'This Week':
      try {
        const currentWeek = startOfWeek(currentDate);
        const { data, error } = await supabase
          .from('bookings')
          .select('startDate , endDate')
          .gte('startDate', currentWeek.toISOString())
          .lte('endDate', currentDate.toISOString());

        if (error) throw error;
        const individualDaysData = {};
        data?.forEach((booking) => {
          const bookingDay = format(parseISO(booking.startDate), 'd');
          individualDaysData[bookingDay] = (individualDaysData[bookingDay] || 0) + 1;
        });

        const individualDays = eachDayOfInterval({
          start: currentWeek,
          end: currentDate,
        });

        const result = individualDays.map((day) => {
          const getDay = format(day, 'd');
          if (individualDaysData[getDay]) {
            return {
              name: getDay,
              'Total Bookings': individualDaysData[getDay],
            };
          }
          return {
            name: getDay,
            'Total Bookings': 0,
          };
        });

        return result;
      } catch (error) {
        throw new Error(error.message);
      }
      break;

    default:
      throw new Error('Invalid range');
  }
}
