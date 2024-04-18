/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
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
import { Button } from '@/shadcn_components/ui/button';
import FilterBookingTable from './FilterBookingTable';
import SortBookingTable from './SortBookingTable';
import SearchBookings from './SearchBookings';
import Pagination from './Pagination';
import { ScrollArea } from '@/shadcn_components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn_components/ui/dropdown-menu';
import { statusColors, DATA_PER_PAGE } from '@/constants/bookingTableConstants';

function RenderSkeletonRow(index: number) {
  return (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="w-full h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-4" />
      </TableCell>
    </TableRow>
  );
}

function DropDownMenuForBookings({
  status,
  bookingID,
}: {
  status: 'unconfirmed' | 'checked out' | 'checked in';
  bookingID: number;
}) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/bookings/bookingInfo/${bookingID}`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none flex items-center justify-center w-[50%]">
        <BsThreeDots />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {status === 'unconfirmed' && (
          <>
            <DropdownMenuItem className="cursor-pointer" onClick={handleClick}>
              <AiOutlineInfoCircle />
              <span className="ml-1">Booking Info</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleClick}>
              <BiLogInCircle />
              <span className="ml-1">Check-in</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClick} className="cursor-pointer">
              <MdDeleteOutline />
              <span className="ml-1">Delete Booking</span>
            </DropdownMenuItem>
          </>
        )}
        {status === 'checked in' && (
          <>
            <DropdownMenuItem className="cursor-pointer" onClick={handleClick}>
              <AiOutlineInfoCircle />
              <span className="ml-1">Booking Info</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleClick}>
              <BiLogOutCircle />
              <span className="ml-1">Check-out</span>
            </DropdownMenuItem>
          </>
        )}
        {status === 'checked out' && (
          // eslint-disable-next-line react/jsx-no-bind
          <DropdownMenuItem className="cursor-pointer" onClick={handleClick}>
            <AiOutlineInfoCircle />
            <span className="ml-1">Booking Info</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default function BookingTable() {
  const [bookingType, setBookingType] = useState('all bookings');
  const [selectedSortOption, setSelectedSortOption] = useState('latest-bookings');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery({
    queryKey: ['bookings', bookingType, selectedSortOption, currentPage, searchTerm],
    queryFn: () => getAllBookings(bookingType, selectedSortOption, currentPage, searchTerm),
  });

  // optimization using prefetching the next page booking data!!
  const queryClient = useQueryClient();
  if (isSuccess && data?.roomData?.length > 0 && data?.count > 0) {
    const totalPages = Math.ceil(data.count / DATA_PER_PAGE);
    if (currentPage < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', bookingType, selectedSortOption, currentPage + 1, searchTerm],
        queryFn: () => getAllBookings(bookingType, selectedSortOption, currentPage + 1, searchTerm),
      });
    }
  }

  return (
    <>
      <div className="flex justify-end w-[80%] gap-x-2 mb-5">
        <FilterBookingTable setBookingType={setBookingType} setCurrentPage={setCurrentPage} />
        <SortBookingTable setSelectedSortOption={setSelectedSortOption} />
        <Button onClick={() => navigate('/bookings/newBooking')} className="bg-gradient">
          Book Offline
        </Button>
      </div>
      <div className="flex w-full mb-6">
        <SearchBookings setSearchTerm={setSearchTerm} />
      </div>
      <ScrollArea className="h-[65vh] w-full rounded-md border">
        <Table className="">
          <TableCaption>
            {(data?.count ?? 0) > 0 ? 'A list of bookings' : 'No Bookings found ⛔'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Booked By</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="">
            {!isSuccess ? (
              <>{Array.from({ length: 15 }).map((_, i) => RenderSkeletonRow(i))}</>
            ) : (
              data?.roomData?.length > 0 &&
              data?.roomData?.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking?.rooms?.name as string}</TableCell>
                  <TableCell>
                    {calculateDistanceDates(booking.created_at) === 0
                      ? 'Booked Recently'
                      : `Booked ${calculateDistanceDates(booking.created_at)} days ago`}
                    <div>{formatDateBookingDate(booking.created_at)}</div>
                  </TableCell>
                  <TableCell>
                    {booking?.guests?.fullName}
                    <div> {booking?.guests?.email}</div>
                  </TableCell>
                  <TableCell className="">
                    {`Stay for ${booking.numNights} nights for ${
                      (booking.numGuests || 0) + 1
                    } guest`}
                    <div>
                      {`${formatDateGeneral(booking.startDate)} -> ${formatDateGeneral(
                        booking.endDate
                      )}`}
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <Badge
                      className={`${statusColors[booking.status!]} hover:${
                        statusColors[booking.status!]
                      }`}
                    >
                      {booking.status?.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="">{formatToINR(booking.totalPrice!)}</TableCell>
                  <TableCell>
                    <DropDownMenuForBookings
                      status={booking.status as 'unconfirmed' | 'checked out' | 'checked in'}
                      bookingID={booking.id}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        dataSize={data?.count || 0}
      />
    </>
  );
}
