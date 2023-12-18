import supabase from './supabaseClient';

export default async function getBookingInfo(bookingID: number) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, guests!inner(fullName,email,nationalID , countryFlag), rooms!inner(name)')
      .eq('id', bookingID);
    if (error) throw error;

    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
