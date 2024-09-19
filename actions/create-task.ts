'use server'

import * as z from 'zod'

import { CreateTaskSchema } from '@/schemas';
import { createClient } from "@/utils/supabase/server";

export const createTask = async (values: z.infer<typeof CreateTaskSchema>) => {
    const validatedFields = CreateTaskSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
    }

    const { title, description, focus_time } = validatedFields.data

    const supabase = createClient();
    const { data, error } = await supabase
        .from('tasks')
        .insert({
            title,
            description,
            focus_time
        })
        .select()
        .single()

    if (error) {
        return { error: error.message }
    }

    return { success: 'Task Created!', data }
}