/* eslint-disable import/extensions */
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { Toaster } from '@/shadcn_components/ui/toaster';
import { AiOutlineHome } from 'react-icons/ai';
import { MdPendingActions } from 'react-icons/md';
import { MdOutlineBedroomChild } from 'react-icons/md';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';

type SideNavItemsType = {
  label: string;
  href: string;
  icon: React.ComponentType;
};

const sideNavItems: SideNavItemsType[] = [
  {
    label: 'Home',
    href: '/dashboard',
    Icon: AiOutlineHome,
  },
  {
    label: 'Bookings',
    href: '/bookings',
    Icon: MdPendingActions,
  },
  {
    label: 'Rooms',
    href: '/rooms',
    Icon: MdOutlineBedroomChild,
  },
  {
    label: 'Users',
    href: '/users',
    Icon: AiOutlineUsergroupAdd,
  },
  {
    label: 'Settings',
    href: '/settings',
    Icon: IoSettingsOutline,
  },
];

export default function AppLayout() {
  return (
    <div className="flex h-full w-full gap-2">
      <Sidebar sideNavItems={sideNavItems} />
      <MainContent>
        <Outlet />
      </MainContent>
      <Toaster />
    </div>
  );
}
