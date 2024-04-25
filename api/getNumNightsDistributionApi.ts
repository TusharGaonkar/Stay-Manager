/* eslint-disable no-return-assign */
import { startOfYear, subMonths, startOfWeek } from 'date-fns';
import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabaseClient';

export default async function getNumNightsDistribution(range: string) {
  try {
    let startDate;
    switch (range) {
      case 'This Year':
        startDate = startOfYear(new Date());
        break;
      case 'Past 6 Months':
        startDate = subMonths(new Date(), 6);
        break;
      case 'Last Month':
        startDate = subMonths(new Date(), 1);
        break;
      default:
        startDate = startOfWeek(new Date());
    }
    const { data, error } = await supabase
      .from('bookings')
      .select('numNights')
      .eq('isPaid', true)
      .gte('startDate', startDate.toISOString())
      .lte('startDate', new Date().toISOString());

    if (error) {
      throw new Error('Error getting average room rate data');
    }
    const nightDurationData: Record<string, unknown> = {};

    data?.forEach((bookingDuration) => {
      const nightDuration = bookingDuration.numNights;
      nightDurationData[nightDuration] = ((nightDurationData[nightDuration] as number) || 0) + 1;
    });

    const fillColors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

    const result = [1, 2, 3, 4, 5].map((duration, index) => ({
      name: `${duration} Night`,
      'Total Bookings': nightDurationData[duration] || 0,
      fill: fillColors[index],
    }));

    result.unshift({
      name: '',
      'Total Bookings': 0,
      fill: '#130D26',
    });

    const bookingsMoreThanFiveDays = Object.keys(nightDurationData)
      .filter((stayDuration) => Number(stayDuration) > 5)
      .reduce((acc, stayDuration) => acc + (nightDurationData[stayDuration] as number), 0);

    result.push({
      name: 'More than 5 Days',
      'Total Bookings': bookingsMoreThanFiveDays,
      fill: '#ffc658',
    });

    return result;
  } catch (error) {
    throw new Error((error as PostgrestError)?.message);
  }
}
