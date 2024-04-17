/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { subMonths, startOfYear, startOfWeek } from 'date-fns';
import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabaseClient';

async function getRevenue(startDate: Date) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('totalPrice')
      .eq('isPaid', true)
      .gte('startDate', startDate.toISOString())
      .lte('startDate', new Date().toISOString());

    if (error) {
      throw new Error('Error getting revenue data');
    }
    const totalRevenue = data.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0);
    return totalRevenue;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function getTotalPeopleServed(startDate: Date) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('numGuests')
      .eq('status', 'checked out')
      .gte('startDate', startDate.toISOString())
      .lte('startDate', new Date().toISOString());

    if (error) {
      throw new Error('Error getting total people served data');
    }
    const totalPeopleServed = data.reduce((acc, booking) => acc + (booking.numGuests || 0) + 1, 0);
    return totalPeopleServed;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function getTotalRooms() {
  try {
    const { count, error } = await supabase.from('rooms').select('*', { count: 'exact' });
    if (error) {
      throw new Error('Error getting total rooms data');
    }

    return count;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function getTotalCheckins() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('numGuests', { count: 'exact' })
      .eq('status', 'checked in');

    if (error) throw error;

    if (data.length === 0) {
      return 0;
    }

    //  Adding 1 to each booking's number of guests to include the main guest who booked.
    const currentGuests = data.reduce((acc, booking) => acc + booking.numGuests + 1, 0);

    return currentGuests;
  } catch (error) {
    throw new Error((error as PostgrestError).message);
  }
}

async function getAverageRoomRate(startDate: Date) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('roomPrice')
      .gte('startDate', startDate.toISOString())
      .lte('startDate', new Date().toISOString());

    if (error) {
      throw new Error('Error getting average room rate data');
    }

    if (data.length === 0) {
      return null;
    }

    const totalRoomPrice = data.reduce((acc, booking) => acc + booking.roomPrice || 0, 0);
    const averageRoomRate = (totalRoomPrice / data.length).toFixed(2);
    return averageRoomRate;
  } catch (error) {
    throw new Error((error as Error)?.message);
  }
}

export default async function getStats(range: string) {
  let startDate;
  if (range === 'This Year') {
    startDate = startOfYear(new Date());
  } else if (range === 'Past 6 Months') {
    startDate = subMonths(new Date(), 6);
  } else if (range === 'Last Month') {
    startDate = subMonths(new Date(), 1);
  } else {
    startDate = startOfWeek(new Date());
  }

  const [totalRevenue, totalPeopleServed, totalRooms, totalCheckins, averageRoomRate] =
    await Promise.all([
      getRevenue(startDate),
      getTotalPeopleServed(startDate),
      getTotalRooms(),
      getTotalCheckins(),
      getAverageRoomRate(startDate),
    ]);

  return {
    totalRevenue,
    totalPeopleServed,
    totalRooms,
    totalCheckins,
    averageRoomRate,
  };
}
