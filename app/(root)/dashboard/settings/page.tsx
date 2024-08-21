import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { Card } from "@/components/ui/card";
import UpdateProfileForm from "@/components/forms/update-profile-form";
import ConfigurationForm from "@/components/forms/configuration-form";

export default async function SettingsPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <>
            <div className="flex flex-col max-h-[calc(100vh-80px)] gap-10 justify-center items-center">
                <h1 className='font-bold leading-none text-[#303030] text-4xl'>Settings</h1>
                <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
                    <div className="flex h-[calc(100vh-250px)]">
                        {/* SIDEBAR */}
                        {/* <section className="sticky left-0 top-0 flex h-full w-fit flex-col justify-between bg-[#303030] p-6 text-white lg:w-[264px] rounded-l-2xl">
                            <div className="flex flex-1 flex-col gap-6">
                                <Link href='/dashboard/settings' className={cn('flex gap-4 items-center p-4 rounded-lg justify-start text-[#303030]')}>
                                    <UserRoundPen color='white' />
                                    <p className={`text-md font-semibold max-lg:hidden text-white`}>
                                        Profile
                                    </p>
                                </Link>
                                <Link href='/dashboard/settings/config' className={cn('flex gap-4 items-center p-4 rounded-lg justify-start text-[#303030]')}>
                                    <Settings color='white' />
                                    <p className={`text-md font-semibold max-lg:hidden text-white`}>
                                        Configuration
                                    </p>
                                </Link>
                            </div>
                        </section> */}
                        {/* FORMS */}
                        <section className="flex relative h-full flex-1 flex-col p-12 max-md:pb-14 sm:px-14 overflow-hidden w-[50vw]">
                            {/* <VscSettingsGear className="text-gray-500/10 rotate-12 text-[500px] absolute z-0 -top-24 -right-24" /> */}
                            <UpdateProfileForm user={user} />
                            <ConfigurationForm />
                        </section>
                    </div>
                </Card>
            </div>
        </>
    );
}