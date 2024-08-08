import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UpdatePasswordPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }
    return (
        <div>UpdatePasswordPage</div>
    )
}