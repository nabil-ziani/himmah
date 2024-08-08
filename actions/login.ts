'use server'

import * as z from 'zod'

import { headers } from "next/headers";
import { LoginSchema } from '@/schemas';
import { createClient } from "@/utils/supabase/server";
import { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
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

export const loginWithOAuth = async (provider: Provider) => {
    const origin = headers().get("origin");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return { error: error.message }
    }

    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
};