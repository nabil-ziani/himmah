import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Tools from "@/components/sections/tools";

export default async function Index() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tools />
      </main>
    </div>
  );
}
