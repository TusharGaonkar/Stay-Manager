import { useQuery } from '@tanstack/react-query';
import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn_components/ui/card';
import getTotalBookingStats from '../../../api/getTotalBookingStatsApi';

export default function TotalBookingsBar({ startDate }: { startDate: string }) {
  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ['totalBookingsStats', startDate],
    queryFn: () => getTotalBookingStats(startDate),
  });

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Bookings Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={270}>
          <BarChart
            data={data}
            margin={{
              right: 30,
              bottom: 10,
              top: 15,
            }}
          >
            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `${value} Bookings`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#000',
                fontSize: 12,
                border: 'none',
                borderRadius: '10px',
              }}
            />
            <Legend wrapperStyle={{ color: '333', fontSize: 12 }} />
            <Bar dataKey="Total Bookings" fill="#c1dea6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
