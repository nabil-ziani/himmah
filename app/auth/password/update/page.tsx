import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Logo from "@/components/logo";
import UpdatePasswordForm from "@/components/forms/update-password-form";

export default async function UpdatePasswordPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }
    return (
        <div className="flex h-screen max-h-screen bg-[#303030]">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px] flex flex-row gap-10">
                    <Logo hideOnSmallDevice={false} />
                    <UpdatePasswordForm />
                </div>
            </section>

            <img
                alt="Train rail surrounded by trees"
                src='/empty-rail-track-surrounded-by-trees.jpg'
                className="side-img object-cover w-[60%]"
            />
        </div>
    )
}