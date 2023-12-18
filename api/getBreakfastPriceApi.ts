import supabase from './supabaseClient';

export default async function getBreakfastPrice() {
  try {
    const { data, error } = await supabase.from('settings').select('breakfastPrice');
    if (error) throw error;
    return data[0]?.breakfastPrice;
  } catch (error) {
    throw new Error(error.message);
  }
}
