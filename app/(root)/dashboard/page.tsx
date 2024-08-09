import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <>
      {/* bg-gradient-to-br to-[#f6ce69] from-[#f86d6d] */}
      <div className="flex gap-3">
        <h1>This is going to be your Himmah dashboard 💻</h1>
      </div>
    </>
  );
}
