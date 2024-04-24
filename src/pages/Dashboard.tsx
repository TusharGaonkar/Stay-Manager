/* eslint-disable import/extensions */
import { useState } from 'react';
import { TbLogout2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import RevenueDistribution from '../features/Dashboard/RevenueDistribution';
import BookingDurationRadial from '../features/Dashboard/BookingDurationRadial';
import UpcomingActivity from '../features/Dashboard/UpcomingActivity';
import BookingsBar from '../features/Dashboard/TotalBookingsBar';
import MostPopularRooms from '../features/Dashboard/MostPopularRooms';
import Stats from '@/features/Dashboard/Stats';
import FilterDashboard from '@/features/Dashboard/FilterDashboard';
import { Button } from '@/shadcn_components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shadcn_components/ui/alert-dialog';
import supabase from '../../api/supabaseClient';
import { toast } from '@/shadcn_components/ui/use-toast';

function ConfirmLogout() {
  const navigate = useNavigate();

  async function logoutUser() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: 'Error',
        description: `${(error as Error)?.message || 'Something went wrong'}`,
      });
    } else {
      toast({
        title: 'Success',
        description: 'You have been signed out successfully',
      });

      navigate('/login');
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1 text-foreground">
          <TbLogout2 className="text-2xl text-foreground" />
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out from this device?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out from this device?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => logoutUser()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function Dashboard() {
  const [startDate, setStartDate] = useState('This Year');
  return (
    <div className="flex flex-col gap-6 p-1 mt-8">
      <h1 className="text-2xl font-bold text-gradient">Main Dashboard</h1>
      <div className="flex items-center justify-end gap-4 mr-2">
        <FilterDashboard setStartDate={setStartDate} />
        <ConfirmLogout />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
        <Stats startDate={startDate} />
        <div className="lg:col-span-2 xl:row-start-2 xl:col-start-3 xl:col-span-1">
          <BookingDurationRadial range={startDate} />
        </div>

        <div className="lg:col-span-3 xl:row-start-2 xl:col-start-4 xl:col-span-full">
          <UpcomingActivity />
        </div>
        <div className="lg:col-span-3 xl:row-start-2 xl:col-span-2">
          <RevenueDistribution startDate={startDate} />
        </div>

        <div className="lg:col-span-2">
          <BookingsBar startDate={startDate} />
        </div>
        <div className="lg:col-span-5 xl:row-start-3 xl:col-start-3 xl:col-span-full">
          <MostPopularRooms startDate={startDate} />
        </div>
      </div>
    </div>
  );
}
