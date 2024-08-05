import React from 'react'
import Logo from './logo'
import AuthButton from './AuthButton'
import { ModeToggle } from './theme-toggle'

const Navbar = () => {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                <Logo />
                <AuthButton />
                <ModeToggle />
            </div>
        </nav>
    )
}

export default Navbar