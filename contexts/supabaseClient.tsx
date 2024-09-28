import { createContext, useContext } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'

const supabase = createClient()

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SupabaseContext.Provider value={supabase}>
            {children}
        </SupabaseContext.Provider>
    )
}

export const useSupabase = () => {
    const context = useContext(SupabaseContext)
    if (!context) {
        throw new Error('useSupabase must be used within a SupabaseProvider')
    }
    return context
}
