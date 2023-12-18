import supabase from './supabaseClient';

export default async function getGuestData(guestID: number) {
  try {
    const { data, error } = await supabase.from('guests').select('*').eq('id', guestID);

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
