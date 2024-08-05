import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href='/' className='flex items-center gap-x-4'>
            <Image
                src="/logo.svg"
                height={1000}
                width={1000}
                alt="himmah"
                className="h-10 w-fit"
            />
            <p className='hidden sm:block font-bold text-3xl max-xs:hidden'>
                Himmah
            </p>
        </Link>
    )
}

export default Logo