import supabase from './supabaseClient';

export default async function getUpcomingActivities() {
  try {
    const currentDate = new Date();

    const { data, error } = await supabase
      .from('bookings')
      .select('* , guests!inner(fullName,email,countryFlag), rooms!inner(name)')
      .gte('endDate', currentDate.toISOString())
      .order('endDate', { ascending: true })
      .order('startDate', { ascending: true })
      .limit(5);

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(error.name);
  }
}
