'use server'

import * as z from 'zod'

import { headers } from "next/headers";
import { ResetPasswordSchema } from '@/schemas';
import { createClient } from "@/utils/supabase/server";

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
    }

    const origin = headers().get("origin");

    const { email } = validatedFields.data

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/reset_password`
    });

    if (error) {
        return { error: error.message }
    }

    return { success: "Reset email sent, you can close this tab now." }
}