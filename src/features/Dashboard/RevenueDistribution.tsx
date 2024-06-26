/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle } from '@/shadcn_components/ui/card';
import getRevenueDistribution from '../../../api/getRevenueDistributionApi';
import formatToINR from '@/utils/currencyFormatter';

interface DataType {
  name: string;
  'Total Revenue': number;
  'Revenue from Extras': number;
}
export default function RevenueDistribution({ startDate }: { startDate: string }) {
  const { data, isLoading } = useQuery<DataType[]>({
    queryKey: ['revenueDistribution', startDate],
    queryFn: () => getRevenueDistribution(startDate),
  });

  return (
    <Skeleton isLoaded={!isLoading}>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className="text-sm font-medium">Revenue Distribution</CardTitle>
        </CardHeader>
        <ResponsiveContainer height={300} width="100%">
          <LineChart
            data={data}
            margin={{
              right: 30,
              bottom: 10,
              left: 10,
            }}
          >
            <XAxis dataKey="name" fontSize={14} />
            <YAxis fontSize={14} />
            <Tooltip
              formatter={(value) => formatToINR(value as number)}
              contentStyle={{
                backgroundColor: '#000',
                fontSize: 12,
                border: 'none',
                borderRadius: '10px',
              }}
            />
            <Legend wrapperStyle={{ color: '333', fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="Total Revenue"
              stroke="#FFC658"
              activeDot={{ r: 3 }}
              dot={false}
            />
            <Line type="monotone" dataKey="Revenue from Extras" stroke="#A4DE6C" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Skeleton>
  );
}
