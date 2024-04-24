/* eslint-disable import/extensions */
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

type SideNavItemsType = {
  label: string;
  href: string;
  icon: React.ComponentType;
};

export default function SideBar({ sideNavItems }: { sideNavItems: SideNavItemsType[] }) {
  const location = useLocation();

  return (
    <div className="p-3 mr-2 bg-secondary/40">
      <div className="flex flex-col gap-4 mt-16">
        {sideNavItems.map(({ label, href, icon: Icon }) => {
          const isActive = location.pathname === href;

          return (
            <div className="relative flex items-center group" key={label}>
              <Link
                to={href}
                className={cn(
                  'h-12 w-12 flex items-center justify-center rounded-full bg-background hover:bg-primary/40 hover:scale-[1.1] duration-200 ease-linear transition-scale hover:rounded-2xl',
                  {
                    'bg-gradient text-background text-white text-3xl rounded-2xl': isActive,
                  }
                )}
              >
                <span>
                  <Icon />
                </span>
              </Link>
              <span className="absolute min-w-max left-[70px] rounded-sm tracking-wide font-medium text-xs bg-slate-200 text-black p-1 z-[999] group-hover:scale-100 scale-0 transition-all duration-200">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
