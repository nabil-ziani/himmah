'use server'

import * as z from 'zod'

import { headers } from "next/headers";
import { ResetPasswordSchema } from '@/schemas';
import { createClient } from "@/utils/supabase/server";

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid email!" }
    }

    const origin = headers().get("origin");

    const { email } = validatedFields.data

    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/reset_password`
    });

    return { success: "Reset email sent, you can close this tab now." }
}