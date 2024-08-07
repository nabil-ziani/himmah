'use server'

import * as z from 'zod'

import { LoginSchema } from '@/schemas';
import { createClient } from "@/utils/supabase/server";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' }
    }

    const { email, password } = validatedFields.data

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message }
    }

    return { success: 'You will be redirected shortly!' }
};