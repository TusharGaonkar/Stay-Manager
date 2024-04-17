/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  subMonths,
  startOfWeek,
  format,
  startOfYear,
  eachMonthOfInterval,
  parseISO,
  eachDayOfInterval,
} from 'date-fns';
import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabaseClient';

export default async function getRevenueDistribution(range: string) {
  const modifiedData: Record<string, { totalPrice: number; extrasPrice: number }> = {};
  const currentDate = new Date();

  switch (range) {
    case 'This Year':
      try {
        const startOfYearDate = startOfYear(currentDate);
        const { data, error } = await supabase
          .from('bookings')
          .select('startDate , totalPrice , extrasPrice')
          .eq('isPaid', true)
          .gte('startDate', startOfYearDate.toISOString())
          .lte('endDate', currentDate.toISOString());

        if (error) {
          throw new Error(error.message);
        }

        const individualMonthData: Record<string, { totalPrice: number; extrasPrice: number }> = {};

        data?.forEach((booking) => {
          const bookingMonth = format(parseISO(booking.startDate), 'MMM');
          const bookingTotalPrice = booking.totalPrice;
          const bookingExtrasPrice = booking.extrasPrice;

          if (individualMonthData[bookingMonth] === undefined) {
            individualMonthData[bookingMonth] = {
              totalPrice: bookingTotalPrice,
              extrasPrice: bookingExtrasPrice,
            };
          } else {
            individualMonthData[bookingMonth].totalPrice += bookingTotalPrice;
            individualMonthData[bookingMonth].extrasPrice += bookingExtrasPrice;
          }
        });

        const allMonths = eachMonthOfInterval({
          start: startOfYearDate,
          end: currentDate,
        });

        allMonths.forEach((month) => {
          const getMonth = format(month, 'MMM');
          individualMonthData[getMonth]
            ? (modifiedData[getMonth] = individualMonthData[getMonth])
            : (modifiedData[getMonth] = {
                totalPrice: 0,
                extrasPrice: 0,
              });
        });

        const result = Object.keys(modifiedData).map((key) => ({
          name: key,
          'Total Revenue': modifiedData[key].totalPrice,
          'Revenue from Extras': modifiedData[key].extrasPrice,
        }));
        return result;
      } catch (error) {
        throw new Error((error as PostgrestError | Error).message);
      }

    case 'Past 6 Months':
      try {
        const sixMonthBefore = subMonths(currentDate, 6);
        const { data, error } = await supabase
          .from('bookings')
          .select('startDate , totalPrice , extrasPrice')
          .eq('isPaid', true)
          .gte('startDate', sixMonthBefore.toISOString())
          .lte('endDate', currentDate.toISOString());

        if (error) {
          throw new Error(error.message);
        }

        const individualMonthData: Record<string, { totalPrice: number; extrasPrice: number }> = {};

        data?.forEach((booking) => {
          const bookingMonth = format(parseISO(booking.startDate), 'MMM');
          const bookingTotalPrice = booking.totalPrice;
          const bookingExtrasPrice = booking.extrasPrice;

          if (individualMonthData[bookingMonth] === undefined) {
            individualMonthData[bookingMonth] = {
              totalPrice: bookingTotalPrice,
              extrasPrice: bookingExtrasPrice,
            };
          } else {
            individualMonthData[bookingMonth].totalPrice += bookingTotalPrice;
            individualMonthData[bookingMonth].extrasPrice += bookingExtrasPrice;
          }
        });

        const allMonths = eachMonthOfInterval({
          start: sixMonthBefore,
          end: currentDate,
        });

        allMonths.forEach((month) => {
          const getMonth = format(month, 'MMM');
          individualMonthData[getMonth]
            ? (modifiedData[getMonth] = individualMonthData[getMonth])
            : (modifiedData[getMonth] = {
                totalPrice: 0,
                extrasPrice: 0,
              });
        });

        const result = Object.keys(modifiedData).map((key) => ({
          name: key,
          'Total Revenue': modifiedData[key].totalPrice,
          'Revenue from Extras': modifiedData[key].extrasPrice,
        }));
        return result;
      } catch (error) {
        throw new Error((error as PostgrestError | Error).message);
      }

    case 'Last Month':
      try {
        const lastMonth = subMonths(currentDate, 1);
        const { data, error } = await supabase
          .from('bookings')
          .select('startDate , totalPrice , extrasPrice')
          .eq('isPaid', true)
          .gte('startDate', lastMonth.toISOString())
          .lte('endDate', currentDate.toISOString());

        if (error) throw new Error(error.message);

        const individualDaysData: Record<string, { totalPrice: number; extrasPrice: number }> = {};
        data?.forEach((booking) => {
          const bookingDay = format(parseISO(booking.startDate), 'd');
          const bookingTotalPrice = booking.totalPrice;
          const bookingExtrasPrice = booking.extrasPrice;
          if (individualDaysData[bookingDay]) {
            individualDaysData[bookingDay].totalPrice += bookingTotalPrice;
            individualDaysData[bookingDay].extrasPrice += bookingExtrasPrice;
          } else {
            individualDaysData[bookingDay] = {
              totalPrice: bookingTotalPrice,
              extrasPrice: bookingExtrasPrice,
            };
          }
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
              'Total Revenue': individualDaysData[getDay].totalPrice,
              'Revenue from Extras': individualDaysData[getDay].extrasPrice,
            };
          }
          return {
            name: getDay,
            'Total Revenue': 0,
            'Revenue from Extras': 0,
          };
        });

        return result;
      } catch (error) {
        throw new Error((error as PostgrestError | Error).message);
      }

    case 'This Week':
      try {
        const currentWeek = startOfWeek(currentDate);
        const { data, error } = await supabase
          .from('bookings')
          .select('startDate , totalPrice , extrasPrice')
          .eq('isPaid', true)
          .gte('startDate', currentWeek.toISOString())
          .lte('endDate', currentDate.toISOString());

        if (error) {
          throw new Error(error.message);
        }

        const individualDaysData: Record<string, { totalPrice: number; extrasPrice: number }> = {};
        data?.forEach((booking) => {
          const bookingDay = format(parseISO(booking.startDate), 'd');
          const bookingTotalPrice = booking.totalPrice;
          const bookingExtrasPrice = booking.extrasPrice;
          if (individualDaysData[bookingDay]) {
            individualDaysData[bookingDay].totalPrice += bookingTotalPrice;
            individualDaysData[bookingDay].extrasPrice += bookingExtrasPrice;
          } else {
            individualDaysData[bookingDay] = {
              totalPrice: bookingTotalPrice,
              extrasPrice: bookingExtrasPrice,
            };
          }
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
              'Total Revenue': individualDaysData[getDay].totalPrice,
              'Revenue from Extras': individualDaysData[getDay].extrasPrice,
            };
          }
          return {
            name: getDay,
            'Total Revenue': 0,
            'Revenue from Extras': 0,
          };
        });

        return result;
      } catch (error) {
        throw new Error((error as PostgrestError | Error).message);
      }

    default:
      throw new Error('Invalid Range');
  }
}
