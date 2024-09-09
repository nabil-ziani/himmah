'use client'

import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

import Link from 'next/link';
import { LayoutDashboard, LucideFocus, Settings2Icon, UsersRoundIcon } from 'lucide-react';

const Sidebar = ({ }) => {
    const pathname = usePathname();

    const renderIcon = (route: string, color: string) => {
        switch (route) {
            case '/dashboard':
                return <LayoutDashboard color={color} />;
            case '/dashboard/focus?mode=timer':
                return <LucideFocus color={color} />;
            case '/dashboard/friends':
                return <UsersRoundIcon color={color} />;
            case '/dashboard/settings':
                return <Settings2Icon color={color} />;
            default:
                return null;
        }

    }

    return (
        <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#303030] p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
            <div className="flex flex-1 flex-col gap-6">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route;
                    return (
                        <Link href={`${link.route}`} key={link.label} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start text-[#303030] hover:bg-white/15', { 'bg-white hover:bg-white': isActive })}>
                            {renderIcon(link.route, isActive ? '#303030' : 'white')}
                            <p className={`text-md font-semibold max-lg:hidden ${isActive ? 'text-[#303030]' : 'text-white'}`}>
                                {link.label}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar