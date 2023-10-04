import { useQuery } from '@tanstack/react-query';
import { format, parseISO, isAfter, isSameDay } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn_components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/shadcn_components/ui/avatar';
import { Button } from '@/shadcn_components/ui/button';
import getUpcomingActivities from '../../../api/getUpcomingActivitiesApi';
import { Badge } from '@/shadcn_components/ui/badge';

type BookingDataType = {
  id: number;
  startDate: string;
  endDate: string;
  guests: { fullName: string; email: string };
};
function CheckStatus({ startDate, endDate }: { startDate: string; endDate: string }) {
  if (isSameDay(parseISO(startDate), new Date()) || isAfter(parseISO(startDate), new Date())) {
    return (
      <Badge className="bg-blue-400 text-xs min-w-max">
        {`Arriving  ${format(parseISO(endDate), 'dd MMM')}`}
      </Badge>
    );
  }
  return (
    <Badge className="bg-violet-400 text-xs">
      {`Departing  ${format(parseISO(endDate), 'dd MMM')}`}
    </Badge>
  );
}

function IndividualTimeline({ booking }: { booking: BookingDataType }) {
  const isArriving =
    isSameDay(parseISO(booking.startDate), new Date()) ||
    isAfter(parseISO(booking.startDate), new Date());
  return (
    <div className="grid grid-cols-4 items-center gap-2 min-w-full justify-center hover:bg-gray-800">
      <div className="">
        <CheckStatus startDate={booking.startDate} endDate={booking.endDate} />
      </div>
      <div className="col-span-2 flex space-x-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://flagsapi.com/IN/shiny/64.png" alt="Avatar" />
        </Avatar>
        <div className="">
          <h1 className="text-sm">{booking.guests.fullName}</h1>
          <h1 className="text-xs text-slate-400">{booking.guests.email}</h1>
        </div>
      </div>

      <div className="">
        <Button className="text-xs font-semibold  bg-green-300 hover:bg-green-200 min-w-full">
          {isArriving ? 'CHECK IN' : 'CHECK OUT'}
        </Button>
      </div>
    </div>
  );
}
export default function UpcomingActivity() {
  const { data, isError, isLoading, isSuccess } = useQuery<BookingDataType[]>({
    queryKey: ['activities'],
    queryFn: () => getUpcomingActivities(),
  });

  return (
    <Card className="w-full h-full">
      <CardHeader className="">
        <CardTitle className="text-sm text-bold">Upcoming Timeline</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-rows-5 items-between gap-3">
        {isSuccess &&
          data?.map((booking: BookingDataType) => (
            <IndividualTimeline key={booking.id} booking={booking} />
          ))}
      </CardContent>
    </Card>
  );
}
