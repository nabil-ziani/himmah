import { SupabaseClient } from '@supabase/supabase-js'
import AuthButton from './auth-button'
import Logo from './logo'

interface DashboardNavbarProps {
    supabase: SupabaseClient
}

const DashboardNavbar = ({ supabase }: DashboardNavbarProps) => {
    return (
        <nav className='flex-between h-[80px] fixed z-50 w-full bg-[#303030] py-4 px-4'>
            <Logo color='text-white' />
            <div>
                <AuthButton />
            </div>
        </nav>
    )
}

export default DashboardNavbar