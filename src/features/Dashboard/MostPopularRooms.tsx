import { useQuery } from '@tanstack/react-query';
import { Card, CardFooter, Image, Button, CardHeader } from '@nextui-org/react';
import getTopRoomsStats from '../../../api/getTopRoomsStatsApi';
import formatToINR from '@/utils/currencyFormatter';

interface Datatype {
  roomID: number;
  totalBookingCount: number;
  roomDetails: {
    name: string;
    description: string;
    image: string;
    regularPrice: number;
  };
}

export default function MostPopularRooms({ startDate }: { startDate: string }) {
  const { data, isLoading, isSuccess } = useQuery<{ data: Datatype[] }>({
    queryKey: ['MostPopularRooms', startDate],
    queryFn: () => getTopRoomsStats(startDate),
  });

  const medals = ['🥇', '🥈', '🥉'];

  return (
    isSuccess && (
      <div className="flex space-x-2">
        {data?.map(({ roomID, totalBookingCount, roomDetails }: Datatype, index: number) => (
          <Card key={roomID} isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <h4 className="text-white/90 text-slate-400 font-bold text-lg drop-shadow-2xl">
                {`${medals[index]} Room-${roomDetails.name} `}
              </h4>
              <h4 className="text-white/90 font-medium text-sm italic drop-shadow-2xl">{`"${roomDetails.description}"`}</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src={roomDetails.image}
            />
            <CardFooter className="grid absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="grid grid-cols-2 items-center justify-between">
                <div className="">
                  <p className="text-tiny text-white/60">
                    {`${formatToINR(roomDetails.regularPrice)}/Night`}
                  </p>
                </div>

                <Button radius="full" className="text-xs bg-transparent min-w-fit">
                  {`Booked by ${totalBookingCount} guests`}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  );
}
