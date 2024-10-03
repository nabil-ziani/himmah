import { redirect } from "next/navigation";

import TaskCard from "@/components/task-card";
import { createClient } from "@/utils/supabase/server";

export default async function TasksPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10 h-[calc(100vh-150px)]">
            <h1 className='font-bold leading-none text-[#303030] text-4xl'>Tasks</h1>
            <div className="flex-1 flex w-full">
                <TaskCard user={user} />
            </div>
        </div>
    );
}
