'use client'

import { createContext, useContext, useMemo } from 'react'
import { createClient as createBrowserClient } from '@/utils/supabase/client'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/database.types'

const SupabaseContext = createContext<SupabaseClient<Database> | null>(null)

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
    const supabase = useMemo(() => createBrowserClient(), [])

    return (
        <SupabaseContext.Provider value={supabase}>
            {children}
        </SupabaseContext.Provider>
    )
}

// Hook om Supabase te gebruiken in andere componenten
export const useSupabase = () => {
    const context = useContext(SupabaseContext);
    if (!context) {
        throw new Error("useSupabase must be used within a SupabaseProvider")
    }
    return context
}