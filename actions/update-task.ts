'use server'

import * as z from 'zod'

import { UpdateTaskSchema } from '@/schemas'
import { createClient } from "@/utils/supabase/server"

export const updateTask = async (taskId: number, values: z.infer<typeof UpdateTaskSchema>) => {
    const validatedFields = UpdateTaskSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
    }

    const { title, description, focus_time } = validatedFields.data

    const supabase = createClient()
    const { data: task, error } = await supabase
        .from('tasks')
        .update({ title, description, focus_time })
        .eq('id', taskId)
        .select()
        .single();

    if (error) {
        return { error: error.message }
    }

    return { success: 'Task Updated!', task }
}