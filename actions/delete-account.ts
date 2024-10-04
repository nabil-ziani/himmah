'use server'

import { createClient } from "@/utils/supabase/server";

export const deleteAccount = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.rpc('delete_user')

    if (error) {
        console.log(error)
        return { error: error.message }
    }

    return { success: 'Your account has been deleted!', data }
}