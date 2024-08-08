import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default async function Index() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Hero />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">What is Himmah?</h2>
          {/* {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs font-bold">
        <p className="text-muted">
          Ignite your <span className="text-[#FFAD94]">flame</span> and live with <span className="text-[#FFDD87]">zeal</span>
        </p>
      </footer>
    </div>
  );
}
