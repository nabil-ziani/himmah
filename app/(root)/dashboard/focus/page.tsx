import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import FocusCard from "@/components/focus-card";

export default async function FocusPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <div className="flex flex-col max-h-[calc(100vh-80px)] gap-10 justify-center items-center">
            <h1 className='font-bold leading-none text-[#303030] text-4xl'>Focus</h1>
            <FocusCard user={user} />
        </div>
    );
}
