import { redirect } from "next/navigation";

import UpdateProfileForm from "@/components/forms/update-profile-form";
import ConfigurationForm from "@/components/forms/configuration-form";
import { Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function SettingsPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10 h-[calc(100vh-150px)]">
            <h1 className='font-bold leading-none text-[#303030] text-4xl'>Settings</h1>
            <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
                <div className="flex h-[calc(100vh-250px)]">
                    <section className="flex relative h-full flex-1 flex-col p-8 sm:px-14 w-[50vw] no-scrollbar overflow-y-scroll scroll-pb-5">
                        <UpdateProfileForm user={user} />
                        <ConfigurationForm />
                    </section>
                </div>
            </Card>
        </div>
    )
}