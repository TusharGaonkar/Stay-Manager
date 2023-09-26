import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn_components/ui/table';
import getAllBookings from '../../../api/getAllBookingsApi';
import { Skeleton } from '@/shadcn_components/ui/skeleton';
import formatToINR from '../../utils/currencyFormatter';
import {
  formatDateGeneral,
  formatDateBookingDate,
  calculateDistanceDates,
} from '../../utils/dateFormatter';
import { Badge } from '@/shadcn_components/ui/badge';
import addNewBooking from '../../../api/addNewBookingApi';
import { Button } from '@/shadcn_components/ui/button';
import FilterBookingTable from './FilterBookingTable';
import SortBookingTable from './SortBookingTable';
import SearchBookings from './SearchBookings';

const statusColors = {
  unconfirmed: 'bg-red-500',
  confirmed: 'bg-green-500',
  'checked out': 'bg-slate-500',
  'checked in': 'bg-purple-500',
};

function renderSkeletonRow(index: number) {
  return (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
    </TableRow>
  );
}
export default function BookingTable() {
  const [bookingType, setBookingType] = useState('all bookings');
  const [selectedSortOption, setSelectedSortOption] = useState('latest-bookings');

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ['bookings', bookingType, selectedSortOption],
    queryFn: () => getAllBookings(bookingType, selectedSortOption),
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addNewBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err: Error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `${err.message}`,
      });
    },
  });

  return (
    <>
      <div className="flex justify-end w-[80%] gap-x-2 mb-5">
        <FilterBookingTable setBookingType={setBookingType} />
        <SortBookingTable setSelectedSortOption={setSelectedSortOption} />
        <Button>Book Offline</Button>
      </div>
      <div className="w-full flex mb-6">
        <SearchBookings />
      </div>

      <Table>
        <TableCaption>A list of all the bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Guest Name</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isSuccess ? (
            <>{Array.from({ length: 20 }).map((_, i) => renderSkeletonRow(i))}</>
          ) : (
            data?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.rooms.name}</TableCell>
                <TableCell>
                  {calculateDistanceDates(booking.created_at) === 0
                    ? 'Booked Today'
                    : `Booked ${calculateDistanceDates(booking.created_at)} days ago`}
                  <div>{formatDateBookingDate(booking.created_at)}</div>
                </TableCell>
                <TableCell>
                  {booking?.guests?.fullName} <div> {booking?.guests?.email}</div>
                </TableCell>
                <TableCell className="">
                  {`Stay for ${booking.numNights} nights`}
                  <div>
                    {`${formatDateGeneral(booking.startDate)} -> ${formatDateGeneral(
                      booking.endDate
                    )}`}
                  </div>
                </TableCell>
                <TableCell className="">
                  <Badge
                    className={`${statusColors[booking?.status!]} hover:${
                      statusColors[booking?.status!]
                    }`}
                  >
                    {booking.status?.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="">{formatToINR(booking.totalPrice!)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}
