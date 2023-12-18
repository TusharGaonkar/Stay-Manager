import supabase from './supabaseClient';
import type { Database } from './supabase';

type BookingType = Database['public']['Tables']['bookings']['Row'];
export default async function createGuest(guestData: BookingType): Promise<BookingType> {
  try {
    const { data, error } = await supabase
      .from('guests')
      .upsert([{ ...guestData }])
      .select('id, fullName,email, nationality, nationalID');

    if (error) throw error;
    return data[0].id;
  } catch (error) {
    throw new Error(error.message);
  }
}
