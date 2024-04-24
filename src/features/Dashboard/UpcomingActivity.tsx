/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import { useQuery } from '@tanstack/react-query';
import { format, parseISO, isAfter, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn_components/ui/card';
import { Avatar, AvatarImage } from '@/shadcn_components/ui/avatar';
import { Button } from '@/shadcn_components/ui/button';
import getUpcomingActivities from '../../../api/getUpcomingActivitiesApi';
import { Badge } from '@/shadcn_components/ui/badge';

type BookingDataType = {
  id: number;
  startDate: string;
  endDate: string;
  guests: { fullName: string; email: string; countryFlag: string };
};

function CheckStatus({ startDate, endDate }: { startDate: string; endDate: string }) {
  if (isSameDay(parseISO(startDate), new Date()) || isAfter(parseISO(startDate), new Date())) {
    return (
      <Badge className="bg-[#8BE9FD] hover:bg-[#8BE9FD] min-w-max">{`Arriving  ${format(
        parseISO(endDate),
        'dd MMM'
      )}`}</Badge>
    );
  }
  return (
    <Badge className="bg-[#FFB86C] min-w-max hover:bg-[#FFB86C]">
      {`Departing  ${format(parseISO(endDate), 'dd MMM')}`}
    </Badge>
  );
}

function IndividualTimeline({ booking }: { booking: BookingDataType }) {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(`/bookings/bookingInfo/${booking.id}`);
  }

  const isArriving =
    isSameDay(parseISO(booking.startDate), new Date()) ||
    isAfter(parseISO(booking.startDate), new Date());

  return (
    <div className="grid items-center justify-center min-w-full grid-cols-4 gap-2">
      <div className="">
        <CheckStatus startDate={booking.startDate} endDate={booking.endDate} />
      </div>
      <div className="flex col-span-2 space-x-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src={booking.guests?.countryFlag} alt="Avatar" />
        </Avatar>
        <div>
          <h1 className="text-sm">{booking.guests.fullName}</h1>
          <h1 className="text-xs text-slate-400">{booking.guests.email}</h1>
        </div>
      </div>

      <div className="">
        <Button
          onClick={() => handleOnClick()}
          className="min-w-full bg-[#F8F8F2] hover:bg-slate-300"
        >
          {isArriving ? 'CHECK IN' : 'CHECK OUT'}
        </Button>
      </div>
    </div>
  );
}
export default function UpcomingActivity() {
  const { data, isSuccess } = useQuery<BookingDataType[]>({
    queryKey: ['activities'],
    queryFn: () => getUpcomingActivities(),
  });

  return (
    <Card className="w-full h-full">
      <CardHeader className="">
        <CardTitle className="text-sm text-bold">Upcoming Timeline</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-rows-5 gap-3 items-between">
        {isSuccess &&
          data?.map((booking: BookingDataType) => (
            <IndividualTimeline key={booking.id} booking={booking} />
          ))}
      </CardContent>
    </Card>
  );
}
