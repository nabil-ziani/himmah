'use server'

import { createClient } from "@/utils/supabase/server";

export const logout = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return { error: error.message }
    }
};