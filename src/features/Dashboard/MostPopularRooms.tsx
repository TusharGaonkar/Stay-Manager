/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Card, CardFooter, Image, Button, CardHeader } from '@nextui-org/react';
import getTopRoomsStats from '../../../api/getTopRoomsStatsApi';
import formatToINR from '@/utils/currencyFormatter';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function MostPopularRooms({ startDate }: { startDate: string }) {
  const { data, isSuccess } = useQuery({
    queryKey: ['MostPopularRooms', startDate],
    queryFn: () => getTopRoomsStats(startDate),
  });

  return (
    <>
      {isSuccess && data?.length === 0 && (
        <h1 className="text-sm font-semibold text-center text-slate-200">
          No bookings found in this date range
        </h1>
      )}
      {isSuccess && data?.length > 0 && (
        <>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {data?.map(({ id, name, regularprice, description, image, bookingcount }, index) => (
              <SwiperSlide key={id}>
                <Card isFooterBlurred className="h-[300px]">
                  <CardHeader className="absolute z-10 flex-col items-start top-1">
                    <h4 className="px-1 font-bold text-slate-800 text-medium drop-shadow-xl bg-white/80 rounded-xl">
                      {`#${index + 1} Room-${name}`}
                    </h4>
                    <p className="mt-1 text-xs font-medium truncate rounded-sm text-black/80 bg-slate-200/40 drop-shadow-2xl max-w-[90%]">
                      {description}
                    </p>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 object-cover w-full h-full"
                    src={image}
                  />
                  <CardFooter className="absolute bottom-0 z-10 grid bg-black/40 border-t-1 border-default-600 dark:border-default-100">
                    <div className="grid items-center justify-between grid-cols-2">
                      <div className="">
                        <p className="text-tiny text-white/60">
                          {`${formatToINR(regularprice)}/night`}
                        </p>
                      </div>
                      <Button radius="full" className="text-xs bg-transparent min-w-fit">
                        {`Booked by ${bookingcount} guests`}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <h2 className="w-full mt-2 text-sm font-semibold text-center text-slate-200">
            Top Rooms
          </h2>
        </>
      )}
    </>
  );
}
