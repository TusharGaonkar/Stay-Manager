/* eslint-disable import/extensions */
import supabase from './supabaseClient';
import type { Database } from './supabase';
import { toast } from '@/shadcn_components/ui/use-toast';

type BookingType = Database['public']['Tables']['bookings']['Row'];
async function addNewBooking(bookingData: Omit<BookingType, 'created_at'>): Promise<BookingType> {
  try {
    toast({
      variant: 'default',
      title: 'Booking the room for you...',
    });
    const { data, error } = await supabase
      .from('bookings')
      .upsert([{ created_at: new Date().toISOString(), ...bookingData }])
      .select();

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Booking failed, please try again.',
      });
      throw error;
    }

    return data[0] as BookingType;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default addNewBooking;
