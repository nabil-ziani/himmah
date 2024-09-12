'use client'

import { logout } from '@/actions/logout'
import { Button } from './ui/button'
import { LogOutIcon } from 'lucide-react'

const LogoutButton = () => {

    const onClick = () => {
        logout()
    }

    return (
        <Button className='flex gap-4 items-center p-6 mb-2 rounded-lg justify-start' variant={'destructive'} onClick={onClick}>
            <LogOutIcon />
            <p className='text-md font-semibold max-lg:hidden'>
                Logout
            </p>
        </Button>
    )
}

export default LogoutButton