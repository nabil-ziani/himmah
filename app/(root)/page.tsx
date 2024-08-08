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

      <main className="flex-1 flex flex-col gap-20 max-w-4xl px-3 h-full">
        <Hero />
        <section className="flex-1 flex flex-col gap-6">

        </section>
        <img
          alt="hero image"
          src="/himmah-home.jpg"
          className="absolute inset-0 h-full w-full object-cover -z-10"
        />
      </main>
    </div>
  );
}
