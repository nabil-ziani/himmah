import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";
import LogoutButton from "./logout-button";

export default async function AuthButton() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <Button variant={'gradient'} size={'lg'}>
      <Link className="text-lg" href="/auth/login">
        Sign In
      </Link>
    </Button>
  );
}
