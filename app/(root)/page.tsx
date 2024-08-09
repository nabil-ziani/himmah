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
    <div>
      <Navbar />
      <main className="w-full h-[100vh] flex justify-center items-start mt-10">
        <Hero />
      </main>
    </div>
  );
}
