import { redirect } from "next/navigation";

import FocusCard from "@/components/focus-card";
import { createClient } from "@/utils/supabase/server";

export default async function FocusPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    // Fetch backgrounds en affirmations hier
    const { data: backgrounds, error: backgroundsError } = await supabase
        .from('backgrounds')
        .select('*');

    const { data: affirmations, error: affirmationsError } = await supabase
        .from('affirmations')
        .select('*');

    if (backgroundsError || affirmationsError) {
        // Behandel errors passend, bijvoorbeeld door een foutpagina te tonen
        return <div>Error loading backgrounds & affirmations</div>;
    }

    return (
        <div className="flex flex-col items-center gap-10 h-[calc(100vh-150px)]">
            <h1 className='font-bold leading-none text-[#303030] text-4xl'>Focus</h1>
            <FocusCard user={user} backgrounds={backgrounds} affirmations={affirmations} />
        </div>
    )
}