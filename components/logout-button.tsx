'use client'

import { logout } from '@/actions/logout'
import { Button } from './ui/button'

const LogoutButton = () => {

    const onClick = () => {
        logout()
    }

    return (
        <Button variant={'destructive'} onClick={onClick}>
            Logout
        </Button>
    )
}

export default LogoutButton