/* eslint-disable import/extensions */
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

type SideNavItemsType = {
  label: string;
  href: string;
  icon: string;
};

const sideNavItems: SideNavItemsType[] = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: '',
  },
  {
    label: 'Bookings',
    href: '/bookings',
    icon: '',
  },
  {
    label: 'Rooms',
    href: '/rooms',
    icon: '',
  },
  {
    label: 'Users',
    href: '/users',
    icon: '',
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: '',
  },
];

export default function AppLayout() {
  return (
    <div className="flex h-full w-full gap-2">
      <Sidebar sideNavItems={sideNavItems} />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
}
