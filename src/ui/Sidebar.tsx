/* eslint-disable import/extensions */
import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from '@/shadcn_components/ui/button';
import { cn } from '@/lib/utils';

type SideNavItemsType = {
  label: string;
  href: string;
  icon: React.ComponentType;
};

export default function SideBar({ sideNavItems }: { sideNavItems: SideNavItemsType[] }) {
  const location = useLocation();

  return (
    <div className=" h-screen flex flex-col bg-[#181818] mr-4">
      <div className="text-3xl font-semibold p-6 text-slate-300">Stay Manager</div>
      {sideNavItems.map(({ label, href, icon: Icon }) => {
        const isActive = location.pathname === href;

        return (
          <Link
            to={href}
            key={label}
            className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start', 'text-md', 'p-8', {
              'bg-violet-400 bg-opacity-90': isActive,
              'hover:bg-violet-400 hover:bg-opacity-90': isActive, // Apply highlight style if active
            })}
          >
            <span className="mr-2">
              <Icon />
            </span>
            {label}
          </Link>
        );
      })}
    </div>
  );
}
