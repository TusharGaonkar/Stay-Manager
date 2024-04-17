/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { subMonths, startOfWeek, startOfYear } from 'date-fns';
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';
import supabase from './supabaseClient';

type TopRoomsResponse = {
  id: number;
  name: string;
  regularprice: number;
  description: string;
  image: string;
  bookingcount: number;
};

export default async function getTopRoomsStats(range: string) {
  let startDate;
  const currentDate = new Date();

  switch (range) {
    case 'This Year':
      startDate = startOfYear(currentDate);
      break;
    case 'Past 6 Months':
      startDate = subMonths(currentDate, 6);
      break;
    case 'Last Month':
      startDate = subMonths(currentDate, 1);
      break;
    case 'This Week':
      startDate = startOfWeek(currentDate);
      break;

    default:
      throw new Error('Invalid range');
  }

  try {
    const { data, error }: PostgrestSingleResponse<TopRoomsResponse[]> = await supabase.rpc(
      'get_top_rooms',
      {
        start_date: startDate.toISOString(),
        end_date: currentDate.toISOString(),
      }
    );

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error((error as PostgrestError | Error).message);
  }
}
