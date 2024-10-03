import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import Navbar from "@/components/navbar"
import SmoothScrolling from "@/components/smooth-scroll";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Features from "@/components/sections/features";
import Benefits from "@/components/sections/benefits";
import Goals from "@/components/sections/goals";
import Footer from "@/components/footer";
import Contact from "@/components/sections/contact";

export default async function Index() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <>
      <Navbar />
      <SmoothScrolling>
        <Hero />
        <About />
        <Features />
        <Benefits />
        <Goals />
        <Contact />
        <Footer />
      </SmoothScrolling>
    </>
  );
}
