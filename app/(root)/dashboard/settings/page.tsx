import { useSupabase } from "@/contexts/supabaseClient";
import { redirect } from "next/navigation";

import UpdateProfileForm from "@/components/forms/update-profile-form";
import ConfigurationForm from "@/components/forms/configuration-form";
import { Card } from "@/components/ui/card";

export default async function SettingsPage() {
    const supabase = useSupabase();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <div className="flex flex-col max-h-[calc(100vh-80px)] gap-10 justify-center items-center">
            <h1 className='font-bold leading-none text-[#303030] text-4xl'>Settings</h1>
            <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
                <div className="flex h-[calc(100vh-250px)]">
                    <section className="flex relative h-full flex-1 flex-col p-12 max-md:pb-14 sm:px-14 overflow-hidden w-[50vw]">
                        <UpdateProfileForm user={user} />
                        <ConfigurationForm />
                    </section>
                </div>
            </Card>
        </div>
    );
}