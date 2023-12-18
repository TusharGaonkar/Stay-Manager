import supabase from './supabaseClient';

export default async function getMaxNumOfNightsPerBooking() {
  try {
    const { data, error } = await supabase.from('settings').select(`maxBookingLength`);
    if (error) throw error;

    return data[0]?.maxBookingLength;
  } catch (error) {
    throw new Error(error.message);
  }
}
