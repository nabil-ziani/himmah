import { Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function FriendsPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <div className="flex flex-col max-h-[calc(100vh-80px)] gap-10 justify-center items-center">
            <h1 className='font-bold leading-none text-[#303030] text-4xl'>Friends</h1>
            <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
                <div className="flex h-[calc(100vh-250px)]">
                    <section className="flex relative h-full flex-1 flex-col p-12 max-md:pb-14 sm:px-14 overflow-hidden w-[50vw]">

                    </section>
                </div>
            </Card>
        </div>
    );
}
