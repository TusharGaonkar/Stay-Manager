/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { BsFillPersonCheckFill, BsClipboardDataFill } from 'react-icons/bs';
import { MdOutlineFamilyRestroom } from 'react-icons/md';
import { BiMath } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import StatCard from './StatsCard';
import getStats from '../../../api/getStatsApi';
import formatToINR from '@/utils/currencyFormatter';
import { Skeleton } from '@/shadcn_components/ui/skeleton';

export default function Stats({ startDate }: { startDate: string }) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['stats', startDate],
    queryFn: () => getStats(startDate),
  });

  let stats: Array<{ label: string; value: string | number; icon: React.FunctionComponent }> = [];

  if (isSuccess) {
    const { totalRevenue, totalPeopleServed, totalRooms, totalCheckins, averageRoomRate } = data;

    stats = [
      {
        label: 'Total Revenue',
        value: formatToINR(totalRevenue),
        icon: FaMoneyBillTrendUp,
      },
      {
        label: 'Total Guests Served',
        value: totalPeopleServed,
        icon: BsFillPersonCheckFill,
      },
      {
        label: 'Total Rooms',
        value: totalRooms || 'No enough data',
        icon: BsClipboardDataFill,
      },
      {
        label: 'Guests Currently on Board',
        value: totalCheckins,
        icon: MdOutlineFamilyRestroom,
      },
      {
        label: 'Average Room Rate',
        value: !averageRoomRate ? 'No enough data' : formatToINR(parseInt(averageRoomRate, 10)),
        icon: BiMath,
      },
    ];
  }
  return (
    <>
      {isLoading && Array.from({ length: 5 }, () => <Skeleton className="h-[110px]" />)}
      {isSuccess && stats?.map((stat) => <StatCard key={stat.label} stat={stat} />)}
    </>
  );
}
