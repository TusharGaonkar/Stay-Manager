import { FaIndianRupeeSign } from 'react-icons/fa6';
import { BsFillPersonCheckFill, BsClipboardDataFill } from 'react-icons/bs';
import { MdOutlineFamilyRestroom } from 'react-icons/md';
import { BiMath } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import StatCard from './StatsCard';
import getStats from '../../../api/getStatsApi';
import formatToINR from '@/utils/currencyFormatter';
import { Skeleton } from '@/shadcn_components/ui/skeleton';

export default function Stats({ startDate }) {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['stats', startDate],
    queryFn: () => getStats(startDate),
  });
  let stats;
  if (isSuccess) {
    const { totalRevenue, totalPeopleServed, totalRooms, totalCheckins, averageRoomRate } = data;
    stats = [
      {
        label: 'Total Revenue',
        value: formatToINR(totalRevenue),
        icon: FaIndianRupeeSign,
      },
      {
        label: 'Total Guests Served',
        value: totalPeopleServed,
        icon: BsFillPersonCheckFill,
      },
      {
        label: 'Total Rooms',
        value: totalRooms,
        icon: BsClipboardDataFill,
      },
      {
        label: 'Guests Currently on Board',
        value: totalCheckins,
        icon: MdOutlineFamilyRestroom,
      },
      {
        label: 'Average Room Rate',
        value: `${formatToINR(averageRoomRate)}/night`,
        icon: BiMath,
      },
    ];
  }
  return (
    <>
      {isLoading && Array.from({ length: 5 }, () => <Skeleton className="h-[110px]" />)}
      {isSuccess &&
        stats.map((stat) => <StatCard key={stat.label} stat={stat} isLoading={isLoading} />)}
    </>
  );
}
