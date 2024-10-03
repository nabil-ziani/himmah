'use client';

import { cn } from '@/lib/utils';
import { ChartNoAxesColumn } from "lucide-react";

interface HomeCardProps {
    className?: string;
    title: string;
    description: string;
}

const DashboardCard = ({ className, title, description }: HomeCardProps) => {
    return (
        <section
            className={cn('bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[200px] rounded-[14px] cursor-pointer', className)}>
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <ChartNoAxesColumn height={40} width={40} color="white" strokeWidth={3} />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg font-normal">{description}</p>
            </div>
        </section>
    );
};

export default DashboardCard;