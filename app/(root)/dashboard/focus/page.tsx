import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function FocusPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <>
            <div className="flex gap-3">
                <h1>This is the focus page 📚</h1>
            </div>
        </>
    );
}
