'use server'

import * as z from 'zod'

import { CreateTaskSchema } from '@/schemas';
import { createClient } from "@/utils/supabase/server";
import { Enums } from '@/database.types';

export const createTask = async (status: Enums<'task_status'>, values: z.infer<typeof CreateTaskSchema>) => {
    const validatedFields = CreateTaskSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
    }

    const { title, description, focus_time } = validatedFields.data

    const supabase = createClient();
    const { data: task, error } = await supabase
        .from('tasks')
        .insert({
            title,
            description,
            focus_time,
            status
        })
        .select()
        .single()

    if (error) {
        return { error: error.message }
    }

    return { success: 'Task Created!', task }
}