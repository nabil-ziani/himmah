import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4 text-white">
      Hey, {user.email}!

      <span className="relative items-center flex">
        <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-red-300 ring-2 ring-white" />
      </span>
    </div>
  ) : (
    <Button variant={'gradient'} size={'lg'}>
      <Link className="text-lg" href="/auth/login">
        Sign In
      </Link>
    </Button>
  );
}
