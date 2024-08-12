'use server'

import * as z from 'zod'

import { UpdatePasswordSchema } from '@/schemas';
import { createClient } from "@/utils/supabase/server";

export const updatePassword = async (values: z.infer<typeof UpdatePasswordSchema>) => {
    const validatedFields = UpdatePasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
    }

    const { password } = validatedFields.data

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
        password
    });

    if (error && error?.code !== 'same_password') {
        return { error: error.message }
    }

    return { success: '' }
}