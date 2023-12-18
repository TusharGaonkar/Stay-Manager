import { subMonths, startOfMonth, endOfMonth, startOfYear, startOfWeek } from 'date-fns';
import supabase from './supabaseClient';

async function getRevenue(startDate) {
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
    const totalRevenue = data.reduce((acc, booking) => acc + booking.totalPrice, 0);
    return totalRevenue;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getTotalPeopleServed(startDate) {
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
    const totalPeopleServed = data.reduce((acc, booking) => acc + booking.numGuests + 1, 0);
    return totalPeopleServed;
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
}

async function getTotalCheckins() {
  const today = new Date().toISOString();

  try {
    const { data, count, error } = await supabase
      .from('bookings')
      .select('numGuests', { count: 'exact' })
      .eq('status', 'checked in');

    if (error) throw error;
    const currentGuests = data.reduce((acc, booking) => acc + booking.numGuests + 1, 0);

    return currentGuests;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAverageRoomRate(startDate) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('roomPrice')
      .gte('startDate', startDate.toISOString())
      .lte('startDate', new Date().toISOString());

    if (error) {
      throw new Error('Error getting average room rate data');
    }
    const totalRoomPrice = data.reduce((acc, booking) => acc + booking.roomPrice, 0);
    const averageRoomRate = (totalRoomPrice / data.length).toFixed(2);
    return averageRoomRate;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export default async function getStats(range) {
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

  const totalRevenue = await getRevenue(startDate);
  const totalPeopleServed = await getTotalPeopleServed(startDate);
  const totalRooms = await getTotalRooms();
  const totalCheckins = await getTotalCheckins();
  const averageRoomRate = await getAverageRoomRate(startDate);

  return {
    totalRevenue,
    totalPeopleServed,
    totalRooms,
    totalCheckins,
    averageRoomRate,
  };
}
