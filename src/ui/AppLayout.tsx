/* eslint-disable import/extensions */
import { Outlet } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdPendingActions } from 'react-icons/md';
import { MdOutlineBedroomChild } from 'react-icons/md';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { Toaster } from '@/shadcn_components/ui/toaster';

type SideNavItemsType = {
  label: string;
  href: string;
  icon: React.ComponentType;
};

const sideNavItems: SideNavItemsType[] = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: AiOutlineHome,
  },
  {
    label: 'Bookings',
    href: '/bookings',
    icon: MdPendingActions,
  },
  {
    label: 'Rooms',
    href: '/rooms',
    icon: MdOutlineBedroomChild,
  },
  {
    label: 'New Booking',
    href: '/bookings/newBooking',
    icon: AiOutlineUsergroupAdd,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: IoSettingsOutline,
  },
];

export default function AppLayout() {
  return (
    <div className="flex w-full h-full gap-2">
      <Sidebar sideNavItems={sideNavItems} />
      <MainContent>
        <Outlet />
      </MainContent>
      <Toaster />
    </div>
  );
}
