import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"
import SettingsCard from "@/components/settings-card"

export default async function SettingsPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10 h-[calc(100vh-150px)]">
            <h1 className='font-bold leading-none text-[#303030] text-4xl'>Settings</h1>
            <SettingsCard user={user} />
        </div>
    )
}