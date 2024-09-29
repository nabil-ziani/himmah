import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface LogoProps {
    hideOnSmallDevice?: boolean
    color?: string
    navbar?: boolean
}

const Logo = ({ hideOnSmallDevice = true, color, navbar = false }: LogoProps) => {
    return (
        <div>
            <Link href='/' className='flex items-center gap-x-4'>
                <Image
                    src={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/logo/logo.png`}
                    height={1000}
                    width={1000}
                    alt="himmah"
                    className="h-12 w-fit"
                />
                <div>
                    <p className={`${hideOnSmallDevice && 'hidden'} sm:block font-bold text-4xl ${color}`}>
                        Himmah
                    </p>

                    {navbar && (
                        <p className={`text-white text-xs ${hideOnSmallDevice && 'hidden'} sm:block`}>
                            Ignite your <span className="text-[#FFAD94]">flame</span> and live with <span className="text-[#FFDD87]">zeal</span>
                        </p>
                    )}
                </div>
            </Link>
        </div>
    )
}

export default Logo