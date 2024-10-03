'use client'

import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

import Link from 'next/link';
import { ClipboardList, LayoutDashboard, LucideFocus, Settings2Icon, UsersRoundIcon } from 'lucide-react';
import LogoutButton from './logout-button';
import { Badge } from './ui/badge';
import { useFriendContext } from '@/contexts/friendshipContext';
import DonationButton from './donation-button';

interface SidebarProps { }

const Sidebar = ({ }: SidebarProps) => {
    const pathname = usePathname()

    const { pendingRequests } = useFriendContext()

    const renderIcon = (route: string, color: string) => {
        switch (route) {
            case '/dashboard':
                return <LayoutDashboard color={color} />;
            case '/dashboard/focus?mode=timer':
                return <LucideFocus color={color} />;
            case '/dashboard/tasks':
                return <ClipboardList color={color} />
            case '/dashboard/friends':
                return <UsersRoundIcon color={color} />;
            case '/dashboard/settings':
                return <Settings2Icon color={color} />;
            default:
                return null;
        }
    }

    return (
        <section className="sticky left-0 top-0 flex h-screen flex-col justify-between bg-[#303030] p-6 pt-28 text-white max-sm:hidden w-[264px]">
            <div className="flex flex-1 gap-6 justify-between flex-col">
                <div className='flex flex-col gap-6'>
                    {sidebarLinks.map((link) => {
                        const isActive = pathname.split('?')[0] === link.route.split('?')[0];

                        return (
                            <Link href={`${link.route}`} key={link.label} className={cn('flex relative gap-4 items-center p-4 rounded-lg justify-start text-[#303030] hover:bg-white/15', { 'bg-white hover:bg-white': isActive })}>
                                {renderIcon(link.route, isActive ? '#303030' : 'white')}
                                {link.route == '/dashboard/friends' && pendingRequests.length > 0 && (
                                    <Badge className="w-6 h-6 rounded-full border-2 bg-[#FF5C5C] text-white font-bold absolute right-5 flex justify-center items-center">
                                        {pendingRequests.length}
                                    </Badge>
                                )}
                                <p className={`text-md font-semibold max-lg:hidden ${isActive ? 'text-[#303030]' : 'text-white'}`}>
                                    {link.label}
                                </p>
                            </Link>
                        )
                    })}
                </div>

                <div className='flex flex-col gap-5'>
                    <DonationButton className='h-12 w-full' />
                    <LogoutButton />
                </div>
            </div>
        </section>
    )
}

export default Sidebar