import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Features from "@/components/sections/features";
import Benefits from "@/components/sections/benefits";
import Goals from "@/components/sections/goals";
import SmoothScrolling from "@/components/smooth-scroll";
import Footer from "@/components/footer";

export default async function Index() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <Navbar />
      <SmoothScrolling>
        <Hero />
        <About />
        <Features />
        <Benefits />
        <Goals />
        <Footer />
      </SmoothScrolling>
    </div>
  );
}
