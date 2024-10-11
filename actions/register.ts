'use server'

import * as z from 'zod'

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
    }

    const origin = headers().get("origin");

    const { name, email, password, sex, birthDate } = validatedFields.data

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
                birthdate: birthDate,
                sex: sex
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.log(error)
        return { error: error.message }
    }

    // Check if email-address is already taken
    if (data.user?.identities && data.user.identities.length > 0) {
        return { success: 'Check email to continue sign in process, you can close this tab.' }
    } else {
        return { error: 'Email address is already taken' }
    }
};