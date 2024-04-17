/* eslint-disable @typescript-eslint/no-throw-literal */
import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabaseClient';

export default async function deleteBookingByID(bookingID: number) {
  try {
    const { error } = await supabase.from('bookings').delete().eq('id', bookingID);
    if (error) throw error;
  } catch (error) {
    throw new Error((error as PostgrestError).message);
  }
}
