import supabase from './supabaseClient';
import type { Database } from './supabase';

const RESULTS_PER_PAGE = 10;

type BookingType = Database['public']['Tables']['bookings']['Row'];
async function getAllBookings(
  filter: string,
  sortBy: string,
  currentPage: number,
  searchTerm: string
): Promise<{ roomData: BookingType[]; count: number }> {
  try {
    let defaultQuery = supabase
      .from('bookings')
      .select('* , rooms!inner(name) , guests!inner(fullName , email) ', { count: 'exact' });

    if (filter !== 'all bookings') {
      defaultQuery = defaultQuery.eq('status', filter);
    }
    if (sortBy) {
      switch (sortBy) {
        case 'latest-bookings':
          defaultQuery = defaultQuery.order('created_at', { ascending: false });
          break;
        case 'oldest-bookings':
          defaultQuery = defaultQuery.order('created_at', { ascending: true });
          break;
        case 'booking-amount-asc':
          defaultQuery = defaultQuery.order('totalPrice', { ascending: true });
          break;
        case 'booking-amount-desc':
          defaultQuery = defaultQuery.order('totalPrice', { ascending: false });
          break;
        default:
          defaultQuery = defaultQuery.order('created_at', { ascending: true });
      }
    }
    if (searchTerm) {
      defaultQuery = defaultQuery.ilike('guests.fullName', `${searchTerm}%`);
    }

    const { data, count, error } = await defaultQuery
      .order('id', { ascending: true })
      .range((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE - 1);

    if (error) throw new Error(error.message);
    if (count === null || count === undefined) throw new Error('Count is null or undefined.');
    return { roomData: data, count };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default getAllBookings;
