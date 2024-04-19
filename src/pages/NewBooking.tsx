/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarIcon } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import { Image } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import getGuestData from '../../api/getGuestDataApi';
import { Card } from '@/shadcn_components/ui/card';
import cn from '@/lib/utils';
import { Button } from '@/shadcn_components/ui/button';
import { Calendar } from '@/shadcn_components/ui/calendar';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shadcn_components/ui/form';
import { Input } from '@/shadcn_components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn_components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn_components/ui/select';
import { Checkbox } from '@/shadcn_components/ui/checkbox';
import formatToINR from '@/utils/currencyFormatter';
import { Textarea } from '@/shadcn_components/ui/textarea';
import { Badge } from '@/shadcn_components/ui/badge';
import useCreateBooking, { BookingFormSchemaType } from '@/hooks/useCreateBooking';
import getAllRoomsForBooking, { type RoomsResponse } from '../../api/getAllRoomsForBookingApi';
import getBreakfastPrice from '../../api/getBreakfastPriceApi';
import addNewBooking from '../../api/addNewBookingApi';
import { toast } from '@/shadcn_components/ui/use-toast';
import { type Database } from '../../api/supabase';

type BookingType = Database['public']['Tables']['bookings']['Row'];

export default function NewBookings() {
  const { guestID } = useParams();
  const navigate = useNavigate();
  const [form, handleSubmit] = useCreateBooking();
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);
  const [numGuests, setNumGuests] = useState<number>(0);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [roomSelected, setRoomSelected] = useState<null | RoomsResponse>(null);

  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const roomImage =
    roomSelected?.image ||
    'https://vmhotzmovgfkkcbozoey.supabase.co/storage/v1/object/public/rooms/0.19068467337825723-009';

  const getAvailableRoomsQuery = useQuery({
    queryKey: ['availableRooms', startDate, endDate, numGuests],
    queryFn: async () => getAllRoomsForBooking(startDate, endDate, numGuests),
  });

  const breakfastQuery = useQuery({
    queryKey: ['breakfastPrice'],
    queryFn: () => getBreakfastPrice(),
  });

  const {
    data: guestData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['guest', guestID],
    queryFn: () => getGuestData(Number(guestID)),
  });

  // reset roomSelected when startDate, endDate, numGuests changes
  useEffect(() => {
    setRoomSelected(null);
    form.resetField('room');
  }, [startDate, endDate, numGuests, form]);

  let diffDays = 0;
  let totalPrice = 0;

  if (startDate && endDate && startDate < endDate) {
    diffDays = differenceInDays(endDate, startDate);
    if (roomSelected) {
      totalPrice =
        diffDays *
        (roomSelected.regularprice -
          (roomSelected.discount || 0) +
          (hasBreakfast ? breakfastQuery?.data || 0 : 0));
    }
  }

  async function handleBookRoom(value: BookingFormSchemaType) {
    if (!value || !value.room) return;

    const roomID = Number(value.room.id);
    const bookingFor = Number(guestID);
    const { startDate, endDate, numGuests, hasBreakfast } = value;
    const numNights = diffDays;
    const roomPrice = value.room.regularprice;
    const extrasPrice = hasBreakfast ? breakfastQuery?.data || 0 : 0;
    const totalPrice = (roomPrice - (value.room?.discount || 0)) * numNights + extrasPrice;
    const status = 'unconfirmed';
    const isPaid = false;
    const { observations } = value;

    const bookingData: Omit<BookingType, 'id' | 'created_at' | 'startDate' | 'endDate'> & {
      startDate: Date;
      endDate: Date;
    } = {
      guestID: bookingFor,
      roomID,
      startDate,
      endDate,
      numGuests,
      hasBreakfast,
      numNights,
      roomPrice,
      extrasPrice,
      totalPrice,
      status,
      isPaid,
      observations: observations ?? null,
    };

    toast({
      variant: 'default',
      title: 'Booking the room for you...',
    });

    const data = await addNewBooking(bookingData);

    if (data) {
      toast({
        variant: 'default',
        title: `Booking successful, your Booking ID is ${data.id}`,
      });

      // Add a delay to show the toast
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 3000);
      });

      setBookingSuccess(true);
    }
  }

  useEffect(() => {
    if (bookingSuccess) {
      const delay = 3000; // 3 seconds

      toast({
        variant: 'default',
        title: 'Redirecting to bookings page, please wait...',
      });

      const timerID = setTimeout(() => {
        navigate('/bookings');
      }, delay);

      return () => clearTimeout(timerID);
    }
  }, [bookingSuccess, navigate]);

  return (
    <>
      {isLoading && <MoonLoader color="#cdc8ff" size={50} />}
      {isSuccess && (
        <>
          <p className="font-semibold text-2xl flex mt-7 ml-3">
            Booking for
            <span className="flex bg-cyan-500 rounded-xl mx-2 items-center text-gradient">
              {guestData?.fullName}
              <img src={guestData?.countryFlag} alt="country flag" className="w-6 h-6 ml-2" />
            </span>
          </p>
          <Card className="grid grid-cols-2 w-[90%] mx-auto  mt-6 gap-8 p-12">
            <div className="flex flex-col space-y-4 justify-center">
              <Image isBlurred isZoomed src={roomImage} className="object-cover h-[600px]" />
            </div>

            <div className="flex flex-col">
              <Form {...form}>
                <form onSubmit={handleSubmit(handleBookRoom)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check-in Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setStartDate(date ?? null);
                              }}
                              disabled={(date) =>
                                date.getTime() <
                                new Date(new Date().setDate(new Date().getDate() - 1)).getTime()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check-out Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setEndDate(date ?? null);
                              }}
                              disabled={(date) => date.getTime() < new Date().getTime()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numGuests"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="">Guests along with you</FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Enter total guests"
                            defaultValue={0}
                            {...field}
                            type="number"
                            {...form.register('numGuests', {
                              valueAsNumber: true,
                            })}
                            onChange={(e) => {
                              if (Number.isNaN(Number(e.target.value))) {
                                e.target.value = '0';
                                setNumGuests(0);
                              } else {
                                setNumGuests(Number(e.target.value));
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="room"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="">Available Rooms for you</FormLabel>
                        <FormControl className="">
                          <Select
                            onValueChange={(data) => {
                              const selectedRoom = JSON.parse(data);
                              field.onChange(selectedRoom);
                              setRoomSelected(selectedRoom);
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              {field.value ? (
                                <SelectValue placeholder="Select Room" />
                              ) : (
                                'Select Room'
                              )}
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableRoomsQuery.data?.map((room) => (
                                <SelectItem key={room.id} value={JSON.stringify(room)}>
                                  {`Room ${room.name} - (${formatToINR(
                                    diffDays * room.regularprice
                                  )} for ${diffDays} days)`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="observations"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="">Any observations ?</FormLabel>
                        <FormControl className="">
                          <Textarea
                            placeholder="Please provide any observations to make"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {breakfastQuery?.data && (
                    <FormField
                      control={form.control}
                      name="hasBreakfast"
                      render={({ field }) => (
                        <FormItem
                          className={cn(
                            'flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-slate-600',
                            { 'bg-green-700': field.value }
                          )}
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(data) => {
                                field.onChange(data);
                                setHasBreakfast(!!data);
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              {`Add Breakfast for ${formatToINR(diffDays * breakfastQuery.data)}?`}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                  <div>
                    {(roomSelected?.discount ?? 0) > 0 ? (
                      <Badge className="bg-primary">
                        {`Congratulations! You've just unlocked a discount of ${formatToINR(
                          diffDays * (roomSelected?.discount || 0)
                        )} `}
                      </Badge>
                    ) : null}
                    <p className="mt-4 text-sm font-semibold">
                      {`Total Cost : ${formatToINR(totalPrice)} ( ${diffDays} nights stay  ${
                        hasBreakfast ? '+ Breakfast' : ''
                      })`}
                    </p>
                  </div>
                  <div className="flex space-x-3 justify-end">
                    <Button
                      type="button"
                      onClick={() => navigate('/bookings')}
                      className="bg-danger text-white hover:bg-red-400  "
                    >
                      {' '}
                      Cancel Booking&nbsp;
                    </Button>
                    <Button type="submit" className="bg-gradient">
                      Book Now
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
