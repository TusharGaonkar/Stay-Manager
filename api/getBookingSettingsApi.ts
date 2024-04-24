/* eslint-disable @typescript-eslint/no-throw-literal */
import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabaseClient';

export default async function getBookingSettings() {
  try {
    const { data, error } = await supabase.from('settings').select('*');

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      throw new Error('No booking settings found');
    }

    return data[0];
  } catch (error) {
    throw new Error((error as PostgrestError | Error).message);
  }
}
