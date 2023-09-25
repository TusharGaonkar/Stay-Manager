/* eslint-disable import/extensions */
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/shadcn_components/ui/button';

type SideNavItemsType = {
  label: string;
  href: string;
  icon: string;
};

export default function SideBar({ sideNavItems }: { sideNavItems: SideNavItemsType[] }) {
  return (
    <div className="w-1/6 min-w-[200px] h-screen flex flex-col">
      <div className="text-3xl font-semibold p-6 text-slate-300"> Stay Manager</div>
      {sideNavItems.map(({ label, href }) => (
        <Link
          to={href}
          key={label}
          className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start', 'text-md', 'p-8')}
        >
          <span className="mr-2">
            <AiOutlineHome />
          </span>
          {label}
        </Link>
      ))}
    </div>
  );
}
