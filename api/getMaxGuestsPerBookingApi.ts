import supabase from './supabaseClient';

export default async function getMaxGuestsPerBooking() {
  try {
    const { data, error } = await supabase.from('settings').select('maxGuestsPerBooking');
    if (error) throw error;
    return data[0]?.maxGuestsPerBooking;
  } catch (error) {
    throw new Error(error.message);
  }
}
