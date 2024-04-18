/* eslint-disable import/extensions */
import { useState } from 'react';
import RevenueDistribution from '../features/Dashboard/RevenueDistribution';
import BookingDurationRadial from '../features/Dashboard/BookingDurationRadial';
import UpcomingActivity from '../features/Dashboard/UpcomingActivity';
import BookingsBar from '../features/Dashboard/TotalBookingsBar';
import MostPopularRooms from '../features/Dashboard/MostPopularRooms';
import Stats from '@/features/Dashboard/Stats';
import FilterDashboard from '@/features/Dashboard/FilterDashboard';

export default function Dashboard() {
  const [startDate, setStartDate] = useState('This Year');
  return (
    <div className="">
      <h1 className="p-4 text-2xl font-semibold text-gradient">Main Dashboard</h1>
      <div className="flex justify-end mb-3">
        <FilterDashboard setStartDate={setStartDate} />
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5 grid-flow-dense">
        <Stats startDate={startDate} />
        <div className="col-span-2">
          <RevenueDistribution startDate={startDate} />
        </div>
        <div className="col-span-1">
          <BookingDurationRadial range={startDate} />
        </div>

        <div className="col-span-2">
          <UpcomingActivity />
        </div>
        <div className="col-span-2">
          <BookingsBar startDate={startDate} />
        </div>
        <div className="col-span-3">
          <MostPopularRooms startDate={startDate} />
        </div>
      </div>
    </div>
  );
}
