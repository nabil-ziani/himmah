import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
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
                <p className='hidden sm:block font-bold text-4xl max-xs:hidden'>
                    Himmah
                </p>
            </Link>
        </div>
    )
}

export default Logo