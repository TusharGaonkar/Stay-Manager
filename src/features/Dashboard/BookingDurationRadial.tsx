/* eslint-disable import/extensions */
import { useQuery } from '@tanstack/react-query';
import { Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import getNumNightsDistribution from '../../../api/getNumNightsDistributionApi';
import { Card } from '@/shadcn_components/ui/card';

interface DataType {
  name: string;
  'Total Bookings': number;
  fill: string;
}
export default function BookingDurationRadial({ range }: { range: string }) {
  const { data, isLoading, isSuccess } = useQuery<DataType[]>({
    queryKey: ['bookingDurationRadial', range],
    queryFn: () => getNumNightsDistribution(range),
  });

  return (
    <Card className="w-full h-full">
      <ResponsiveContainer height="100%" width="100%">
        <RadialBarChart data={data} innerRadius="10%" outerRadius="80%">
          <Tooltip
            contentStyle={{
              backgroundColor: '#000',
              fontSize: 12,
              border: 'none',
              borderRadius: '10px',
            }}
            itemStyle={{ color: 'white' }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: 'white' }}
            layout="horizontal"
            verticalAlign="top"
            height={50}
          />
          <RadialBar background={{ fill: '#2c2c2c' }} dataKey="Total Bookings" />
        </RadialBarChart>
      </ResponsiveContainer>
    </Card>
  );
}
