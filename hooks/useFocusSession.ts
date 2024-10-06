// useFocusSession.ts
import { useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'

interface UseFocusSessionProps {
    supabase: SupabaseClient
    userId: string
    type: 'timer' | 'stopwatch'
}

export const useFocusSession = ({ supabase, userId, type }: UseFocusSessionProps) => {
    const [sessionId, setSessionId] = useState<number | null>(null)
    const [startTime, setStartTime] = useState<string | null>(null)

    const startSession = async () => {
        const { data, error } = await supabase
            .from('focus_sessions')
            .insert({
                user_id: userId,
                type
            })
            .select()
            .single()

        if (error) {
            throw error
        }

        setSessionId(data.id)
        setStartTime(data.start_time)
    }

    const endSession = async (completed: boolean) => {
        if (!startTime || !sessionId) {
            throw new Error('Start time or session ID undefined')
        }

        const end_time = new Date()

        const { error } = await supabase
            .from('focus_sessions')
            .update({
                end_time: end_time.toISOString(),
                completed
            })
            .eq('id', sessionId)

        if (error) {
            throw error
        }

        // Reset state
        setSessionId(null)
        setStartTime(null)
    }

    return { startSession, endSession, sessionId, startTime }
}