import Logo from './logo'
import AuthButton from './auth-button'
import { Button } from './ui/button'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import HamburgerIcon from '@/public/icons/hamburger'

// TODO: check if user is authenticated, if so then hide nav
const Navbar = () => {
    return (
        <header className="bg-black sticky top-0 z-50 w-full shadow-sm backdrop-blur-lg backdrop-filter bg-opacity-60">
            <div className="mx-5 flex h-20 items-center justify-between px-4 md:px-6">
                <Logo color='text-white' navbar={false} />
                <nav className="hidden md:flex md:gap-5 lg:gap-10 xl:gap-20 text-white">
                    <Link href="#about" className="font-light hover:underline hover:underline-offset-4" prefetch={false}>
                        About
                    </Link>
                    <Link href="#tools" className="font-light hover:underline hover:underline-offset-4" prefetch={false}>
                        Tools
                    </Link>
                    <Link href="#benefits" className="font-light hover:underline hover:underline-offset-4" prefetch={false}>
                        Benefits
                    </Link>
                    <Link href="#goals" className="font-light hover:underline hover:underline-offset-4" prefetch={false}>
                        Goals
                    </Link>
                    <Link href="#contact" className="font-light hover:underline hover:underline-offset-4" prefetch={false}>
                        Contact
                    </Link>
                </nav>

                {/* MOBILE */}
                <div className="flex items-center gap-4">
                    <AuthButton />
                    {/* <ModeToggle /> */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden text-white">
                                <HamburgerIcon />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="grid gap-2 py-6">
                                <Link href="#about" className="font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                                    About
                                </Link>
                                <Link href="#tools" className="font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                                    Tools
                                </Link>
                                <Link href="#benefits" className="font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                                    Benefits
                                </Link>
                                <Link href="#goals" className="font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                                    Goals
                                </Link>
                                <Link href="#contact" className="font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                                    Contact
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default Navbar