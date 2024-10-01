import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import Navbar from "@/components/navbar"
import LandingPage from "@/components/landing-page"

export default async function Index() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}
