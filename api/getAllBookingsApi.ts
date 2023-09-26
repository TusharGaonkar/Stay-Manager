import supabase from './supabaseClient';
import type { Database } from './supabase';

type BookingType = Database['public']['Tables']['bookings']['Row'];
async function getAllBookings(filter: string, sortBy: string): Promise<BookingType[]> {
  try {
    let defaultQuery = supabase
      .from('bookings')
      .select('* , rooms(name) , guests(fullName , email) ');

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
          defaultQuery.order('created_at', { ascending: true });
      }
    }

    const { data, error } = await defaultQuery;
    if (error) throw new Error(error.message);
    return data as BookingType[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default getAllBookings;
