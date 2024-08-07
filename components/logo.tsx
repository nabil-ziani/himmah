import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface LogoProps {
    hideOnSmallDevice?: boolean
}

const Logo = ({ hideOnSmallDevice = true }: LogoProps) => {
    return (
        <div>
            <Link href='/' className='flex items-center gap-x-4'>
                <Image
                    src="/logo.png"
                    height={1000}
                    width={1000}
                    alt="himmah"
                    className="h-12 w-fit"
                />
                <p className={`${hideOnSmallDevice && 'hidden'} sm:block font-bold text-4xl`}>
                    Himmah
                </p>
            </Link>
        </div>
    )
}

export default Logo