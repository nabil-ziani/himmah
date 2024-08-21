'use server'

import * as z from 'zod'

import { UpdateProfileSchema } from '@/schemas';
import { createClient } from "@/utils/supabase/server";

export const updateProfile = async (values: z.infer<typeof UpdateProfileSchema>) => {
    const validatedFields = UpdateProfileSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
    }

    const { name, email, birthdate, sex } = validatedFields.data

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
        email,
        data: {
            name,
            birthdate: birthdate,
            sex
        }
    });

    if (error) {
        return { error: error.message }
    }

    return { success: 'Profile updated!' }
}