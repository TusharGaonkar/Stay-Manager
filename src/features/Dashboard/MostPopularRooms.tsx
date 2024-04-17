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
        <h1 className="text-sm text-slate-200 font-semibold text-center">
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
                  <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <h4 className="text-slate-800 font-bold text-lg drop-shadow-xl bg-slate-200 px-1 rounded-md">
                      {`#${index + 1} Room-${name}`}
                    </h4>
                    <h5 className="text-black/80 mt-1 rounded-sm bg-slate-200/40 font-medium text-xs drop-shadow-2xl">{`"${description}"`}</h5>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover"
                    src={image}
                  />
                  <CardFooter className="grid absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="grid grid-cols-2 items-center justify-between">
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
          <h2 className="text-slate-200 text-sm mt-2 font-semibold text-center w-full">
            Top Rooms
          </h2>
        </>
      )}
    </>
  );
}
