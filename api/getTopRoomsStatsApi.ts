import supabase from './supabaseClient';
import { subMonths, startOfWeek, startOfYear } from 'date-fns';

export default async function getTopRoomsStats(range: string, limit = 3) {
  let startDate;
  const currentDate = new Date();

  switch (range) {
    case 'This Year':
      startDate = startOfYear(currentDate);
      break;
    case 'Past 6 Months':
      startDate = subMonths(currentDate, 6);
      break;
    case 'Last Month':
      startDate = subMonths(currentDate, 1);
      break;
    case 'This Week':
      startDate = startOfWeek(currentDate);
      break;

    default:
      throw new Error('Invalid range');
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('roomID, rooms!inner(name , image , description , regularPrice)')
      .gte('startDate', startDate.toISOString())
      .lte('endDate', currentDate.toISOString());

    if (error) throw error;
    const individualRoomData = {};

    data?.forEach((booking) => {
      const roomID = booking.roomID;
      const room = booking.rooms;
      if (individualRoomData[roomID] === undefined) {
        individualRoomData[roomID] = {
          totalBookingCount: 1,
          roomID,
          roomDetails: room,
        };
      } else {
        individualRoomData[roomID].totalBookingCount += 1;
      }
    });

    const sortedRoomData = Object.values(individualRoomData).sort(
      (roomA, roomB) => roomB.totalBookingCount - roomA.totalBookingCount
    );

    return sortedRoomData.slice(0, Math.min(limit, sortedRoomData.length));
  } catch (error) {
    throw new Error(error.name);
  }
}
