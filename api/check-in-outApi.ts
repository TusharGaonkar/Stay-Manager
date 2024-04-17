/* eslint-disable @typescript-eslint/no-throw-literal */
import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabaseClient';

export async function checkIn(bookingID: number) {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ isPaid: true, status: 'checked in' })
      .eq('id', bookingID);
    if (error) throw error;
  } catch (error) {
    throw new Error((error as PostgrestError).message);
  }
}

export async function checkOut(bookingID: number) {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'checked out' })
      .eq('id', bookingID);
    if (error) throw error;
  } catch (error) {
    throw new Error((error as PostgrestError).message);
  }
}
