'use client'

import Logo from './logo'
import Link from 'next/link'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { IconProps } from '@radix-ui/react-icons/dist/types'

function FacebookIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    )
}

function InstagramIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}

function TwitterIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    )
}

function MailIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}

const Footer = () => {
    return (
        <footer id='contact' className="bg-[#303030] py-10 md:py-12 lg:py-15">
            <div className="mx-5 px-4 flex justify-between flex-wrap gap-4">
                <div className="flex flex-col items-start gap-4">
                    <Link href="/" className="flex items-center gap-2" prefetch={false}>
                        <Logo color='text-white' navbar />
                    </Link>
                    <div className="flex mt-4 items-center gap-10">
                        <Link href="#" className="text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            <TwitterIcon className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            <InstagramIcon className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            <FacebookIcon className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="mailto:contact@himmah.pro" className="text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            <MailIcon className="h-5 w-5" />
                            <span className="sr-only">contact@himmah.pro</span>
                        </Link>
                    </div>
                </div>
                <div className="flex gap-10 md:gap-40 flex-wrap">
                    <div className="grid gap-2">
                        <h4 className="text-sm font-medium text-[#b3b3b3]">Product</h4>
                        <Link href="#" className="text-sm text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            Features
                        </Link>
                        <Link href="#" className="text-sm text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            Pricing
                        </Link>
                        <Link href="#" className="text-sm text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            Integrations
                        </Link>
                    </div>
                    <div className="grid gap-2">
                        <h4 className="text-sm font-medium text-[#b3b3b3]">Company</h4>
                        <Link href="#" className="text-sm text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="text-sm text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            Blog
                        </Link>
                        <Link href="#" className="text-sm text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            Careers
                        </Link>
                    </div>
                    <div className="grid gap-2">
                        <h4 className="text-sm font-medium text-[#b3b3b3]">Support</h4>
                        <Link href="#" className="text-sm text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            FAQ
                        </Link>
                        <Link href="#" className="text-sm text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            Helpdesk
                        </Link>
                        <Link href="#" className="text-sm text-[#8c8c8c] hover:text-[#b3b3b3]" prefetch={false}>
                            Contact
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-start text-left gap-4 md:col-span-2 lg:col-span-1">
                    <h4 className="text-sm font-medium text-[#b3b3b3]">Subscribe to our newsletter</h4>
                    <p className="text-sm text-[#8c8c8c]">Get the latest news and updates from Acme Inc.</p>
                    <form className="flex w-full max-w-md gap-2">
                        <Input type="email" placeholder="Enter your email" className="flex-1" />
                        <Button type="submit" variant={'gradient'}>
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>
            <div className="mx-5 px-4 mt-8 flex flex-col items-center justify-between gap-4 text-sm text-[#8c8c8c] md:flex-row">
                <p>&copy; 2024 Himmah Inc. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <Link href="#" className="hover:text-[#b3b3b3]" prefetch={false}>
                        Terms of Service
                    </Link>
                    <Link href="#" className="hover:text-[#b3b3b3]" prefetch={false}>
                        Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-[#b3b3b3]" prefetch={false}>
                        Cookie Policy
                    </Link>
                </div>
            </div>
        </footer >
    )
}

export default Footer