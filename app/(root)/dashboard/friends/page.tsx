import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function FriendsPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <>
            <div className="flex gap-3">
                <h1>This is the friends page ❤️</h1>
            </div>
        </>
    );
}
