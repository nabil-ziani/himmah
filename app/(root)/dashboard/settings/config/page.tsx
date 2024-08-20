'use client'

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { Cog, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { VscSettingsGear } from "react-icons/vsc";

export default async function ConfigurationPage() {
    const supabase = createClient();

    const pathname = usePathname();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <>
            <div className="flex flex-col max-h-[calc(100vh-80px)] gap-10 justify-center">
                <h1 className='font-bold leading-none text-[#303030] text-4xl'>Settings</h1>
                <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
                    <div className="flex h-[calc(100vh-250px)]">
                        {/* SIDEBAR */}
                        <section className="sticky left-0 top-0 flex h-full w-fit flex-col justify-between bg-[#303030] p-6 text-white lg:w-[264px] rounded-l-2xl">
                            <div className="flex flex-1 flex-col gap-6">
                                <Link href='/dashboard/settings' className={cn('flex gap-4 items-center p-4 rounded-lg justify-start text-[#303030]', { 'bg-white': pathname === 'dashboard/settings' })}>
                                    <UserRoundPen color={pathname === 'dashboard/settings' ? '#303030' : 'white'} />
                                    <p className={`text-md font-semibold max-lg:hidden ${pathname === 'dashboard/settings' ? 'text-[#303030]' : 'text-white'}`}>
                                        Profile
                                    </p>
                                </Link>
                                <Link href='/dashboard/settings/config' className={cn('flex gap-4 items-center p-4 rounded-lg justify-start text-[#303030]', { 'bg-white': pathname === 'dashboard/settings/config' })}>
                                    <Cog color={pathname === 'dashboard/settings/config' ? '#303030' : 'white'} />
                                    <p className={`text-md font-semibold max-lg:hidden ${pathname === 'dashboard/settings/config' ? 'text-[#303030]' : 'text-white'}`}>
                                        Configuration
                                    </p>
                                </Link>
                            </div>
                        </section>
                        {/* FORM */}
                        <section className="flex relative h-full flex-1 flex-col p-12 max-md:pb-14 sm:px-14 overflow-hidden">
                            <VscSettingsGear className="text-gray-500/10 rotate-12 text-[500px] absolute z-0 -top-24 -right-24" />
                            <div className="h-full w-full bg-red-200">
                                --- CONFIG FORM ---
                            </div>
                            <div className="bg-blue-300 flex justify-start items-center">
                                {/* <Button size={'lg'} variant={'gradient'}>
                                    Update Profile
                                </Button> */}
                            </div>
                        </section>
                    </div>
                </Card>
            </div>
        </>
    );
}