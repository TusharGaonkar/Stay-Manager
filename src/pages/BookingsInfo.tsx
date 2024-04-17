/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/extensions */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { RiHotelLine } from 'react-icons/ri';
import {
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlinePushpin,
  AiOutlineWarning,
} from 'react-icons/ai';

import { BiUserCheck, BiTimeFive } from 'react-icons/bi';
import { MdOutlineFreeBreakfast } from 'react-icons/md';

import { BsBookmark } from 'react-icons/bs';

import { TbCurrencyRupeeNepalese } from 'react-icons/tb';
import { useState } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { Button } from '@/shadcn_components/ui/button';
import { Checkbox } from '@/shadcn_components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shadcn_components/ui/alert-dialog';
import { toast } from '@/shadcn_components/ui/use-toast';

import deleteBookingByID from '../../api/deleteBookingByIDApi';
import { checkIn, checkOut } from '../../api/check-in-outApi';
import cn from '@/lib/utils';
import formatToINR from '@/utils/currencyFormatter';
import { statusColors } from '@/constants/bookingTableConstants';
import getBookingInfo from '../../api/getBookingInfoApi';
import { Card } from '@/shadcn_components/ui/card';
import { Badge } from '@/shadcn_components/ui/badge';
import type { Database } from '../../api/supabase';

type BookingType = Database['public']['Tables']['bookings']['Row'];

type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

function TotalAmount({ bookingData }: { bookingData: NonNullableFields<BookingType> }) {
  return (
    <div
      className={cn('flex items-center space-x-2 p-4 w-full rounded-sm', {
        'bg-green-500/70': bookingData?.isPaid,
        'bg-gradient-to-r from-yellow-600 to-orange-600/70 ': !bookingData?.isPaid,
      })}
    >
      <span>
        <TbCurrencyRupeeNepalese />
      </span>
      <h1 className="font-semibold">{`Total Amount: ${formatToINR(bookingData.totalPrice)}`}</h1>
      <h1 className="text-sm">
        {`(Room Price : ${formatToINR(bookingData.totalPrice - bookingData.extrasPrice)} ${
          bookingData?.extrasPrice > 0
            ? ` + Extras: ${formatToINR(bookingData.extrasPrice)} )`
            : ' )'
        }`}
      </h1>
      <div className="flex-grow" />
      <span className="">
        <Badge className="bg-orange-300">
          {bookingData?.isPaid ? 'Already Paid' : 'UNPAID, Payment on arrival'}
        </Badge>
      </span>
    </div>
  );
}

function ActionButton({
  status,
  bookingID,
}: {
  status: 'unconfirmed' | 'checked out' | 'checked in';
  bookingID: number;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  async function handleDelete() {
    toast({
      title: 'Deleting Booking..',
    });

    await deleteBookingByID(bookingID);
    toast({
      title: 'Booking deleted..',
    });
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
    navigate('/bookings');
  }

  async function handleCheckIn() {
    toast({
      title: 'Checking in..',
    });
    await checkIn(bookingID);
    toast({
      title: 'Successfully checked in ...',
    });
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
  }

  async function handleCheckOut() {
    toast({
      title: 'Checking out..',
    });
    await checkOut(bookingID);
    toast({
      title: 'Successfully checked out ...',
    });
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
  }
  return (
    <>
      {status === 'unconfirmed' && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 p-3">
            <Checkbox id="confirm-pay" onClick={() => setIsChecked(!isChecked)} />
            <label
              htmlFor="confirm-pay"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I confirm that the guest has paid the full amount for the booking upon arrival.
            </label>
          </div>
          <div className="w-full flex justify-end space-x-2 mt-2">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="bg-red-500/90 hover:bg-red-500 text-white">
                  DELETE BOOKING
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the booking and
                    related data from the servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500/90 hover:bg-red-500"
                    onClick={() => handleDelete()}
                  >
                    Confirm Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger disabled={!isChecked}>
                <Button disabled={!isChecked} className="bg-green-300">
                  CHECK IN
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone,are you sure you want to check-in?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleCheckIn()}>
                    Confirm Check In
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
      {status === 'checked in' && (
        <div className="w-full flex justify-end space-x-2 mt-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="bg-green-300">CHECK OUT</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone,are you sure you want to check-out?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleCheckOut()}>
                  Confirm Check Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
}
export default function BookingsInfo() {
  const { bookingID } = useParams();
  const navigate = useNavigate();
  const {
    data: bookingData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['bookings', bookingID],
    queryFn: () => getBookingInfo(Number(bookingID)),
  });

  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <MoonLoader color="#36d7b7" size={40} />
        </div>
      )}
      {isSuccess && (
        <div className="w-[80%] mx-auto mt-16">
          <Card className="flex flex-col space-y-8 p-6">
            <div className="flex space-x-3 items-center">
              <span>
                <BsBookmark />
              </span>
              <h1 className="font-bold text-2xl">{`Booking ID #${bookingData.id}`}</h1>
              <span>
                <Badge className={statusColors[bookingData.status]}>
                  {bookingData.status.toUpperCase()}
                </Badge>
              </span>
              <div className="flex-grow" />
              <Button variant="outline" onClick={() => navigate(-1)}>
                {'<- Go Back'}
              </Button>
            </div>
            {bookingData.status === 'unconfirmed' &&
              differenceInCalendarDays(parseISO(bookingData.startDate), new Date()) < 0 && (
                <div className="flex">
                  <h1 className="flex items-center w-full text-sm  bg-[#ff9966]/50 p-2 rounded-sm">
                    <span className="mr-1">
                      <AiOutlineWarning />
                    </span>
                    Note: Booking has expired, The starting date has passed and the guest did not
                    show up. Please proceed to delete this booking.
                  </h1>
                </div>
              )}
            <div className="flex justify-between p-6 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500">
              <h1 className="flex items-center">
                <span className="mr-1">
                  <RiHotelLine />
                </span>
                {`${bookingData.numNights} Night stay in Room ${bookingData.rooms.name}`}
              </h1>
              <h1 className="font-semibold flex items-center">
                <span className="mr-1">
                  <AiOutlineCalendar />
                </span>
                {`${format(parseISO(bookingData.startDate), 'dd MMM yyyy')} to ${format(
                  parseISO(bookingData.endDate),
                  'dd MMM yyyy'
                )}`}
              </h1>
            </div>
            <div className="flex space-x-1 items-center font-semibold">
              <span>
                <BiTimeFive />
              </span>
              <h1 className="text-slate-300">
                {`Booked on ${format(parseISO(bookingData.created_at), 'dd MMM yyyy hh:mm a')}`}
              </h1>
            </div>
            <div className="flex space-x-2 items-center">
              <img width="40" height="40" src={bookingData.guests.countryFlag} alt="country-flag" />
              <h1 className="font-semibold">{`${bookingData.guests.fullName}`}</h1>
              <h1>{`+ ${bookingData.numGuests} guest`}</h1>
              <h1 className="text-slate-300 flex items-center">
                <span className="mr-1">
                  <AiOutlineMail />
                </span>
                {`${bookingData.guests.email}`}
              </h1>
              <h1 className="text-slate-300 flex items-center">
                <span className="mr-1">
                  <BiUserCheck />
                </span>
                National ID
                <span className="ml-2">{bookingData.guests.nationalID}</span>
              </h1>
            </div>
            <div className="flex space-x-1 items-center font-semibold">
              <span>
                <MdOutlineFreeBreakfast />
              </span>
              <h1 className="flex items-center">
                Breakfast included :&nbsp;
                <span className="text-slate-300">{bookingData.hasBreakfast ? 'Yes' : 'No'}</span>
              </h1>
            </div>
            <div className="flex space-x-1 items-center">
              <span>
                <AiOutlinePushpin />
              </span>
              <h1 className="font-semibold">Observations : </h1>
              <p className="italic underline text-slate-300 ">
                {bookingData.observations || 'None'}
              </p>
            </div>
            <div className="flex space-x-2">
              <TotalAmount bookingData={bookingData} />
            </div>
          </Card>
          <div>
            <ActionButton status={bookingData.status} bookingID={bookingData.id} />
          </div>
        </div>
      )}
    </>
  );
}
