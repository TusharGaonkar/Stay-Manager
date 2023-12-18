import { toast } from '@/shadcn_components/ui/use-toast';
import supabase from './supabaseClient';
import { differenceInDays, format } from 'date-fns';

export default async function getAllRoomsForBooking(
  startDate: string,
  endDate: string,
  totalPeople: number
) {
  try {
    if (!startDate || !endDate) return [];
    toast({
      variant: 'default',
      title: `Checking room availability from ${format(startDate, 'MMM dd yy')} to ${format(
        endDate,
        'MMM dd yy'
      )} for ${totalPeople} guests.`,
    });

    if (differenceInDays(endDate, startDate) <= 0) {
      toast({
        variant: 'destructive',
        title: 'Start date must be before end date.',
      });
      return [];
    }
    const { data, error } = await supabase.rpc('get_available_rooms', {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      total_people: totalPeople,
    });

    if (data.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Sorry all available rooms are full..',
      });
    } else {
      toast({
        variant: 'default',
        title: `Found ${data.length} available rooms.`,
      });
    }
    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
