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
    <div className="flex flex-col h-full mr-4 bg-secondary/30">
      {sideNavItems.map(({ label, href, icon: Icon }) => {
        const isActive = location.pathname === href;

        return (
          <Link
            to={href}
            key={label}
            className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start', 'text-md', 'p-8', {
              'bg-primary': isActive,
              'hover:bg-violet-400 hover:bg-opacity-90': isActive, // Apply highlight style if active
            })}
          >
            <span className="mr-2">
              <Icon />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
