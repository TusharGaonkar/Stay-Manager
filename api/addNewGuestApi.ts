/* eslint-disable @typescript-eslint/no-throw-literal */
import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabaseClient';
import type { Database } from './supabase';

type GuestInfo = Database['public']['Tables']['guests']['Row'];

export default async function createGuest(guestData: Omit<GuestInfo, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('guests')
      .upsert([{ ...guestData }])
      .select('id, fullName,email, nationality, nationalID');

    if (error) throw error;
    return data[0].id;
  } catch (error) {
    throw new Error((error as PostgrestError).message || 'Something went wrong');
  }
}
