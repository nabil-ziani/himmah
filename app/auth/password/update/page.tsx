import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Image from "next/image";
import Logo from "@/components/logo";
import UpdatePasswordForm from "@/components/update-password-form";

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

            <Image
                src="/himmah-banner.jpg"
                height={1000}
                width={1000}
                alt="side image"
                className="side-img w-[60%]"
            />
        </div>
    )
}