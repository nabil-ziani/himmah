import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Tools from "@/components/sections/tools";
import Preview from "@/components/sections/preview";
import Benefits from "@/components/sections/benefits";
import Goals from "@/components/sections/goals";

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
        <Preview />
        <Benefits />
        <Goals />
      </main>
    </div>
  );
}
