import supabase from './supabaseClient';

export default async function deleteBookingByID(bookingID: number) {
  try {
    const { error } = await supabase.from('bookings').delete().eq('id', bookingID);
    if (error) throw error;
  } catch (error) {
    throw new Error(error.message);
  }
}
