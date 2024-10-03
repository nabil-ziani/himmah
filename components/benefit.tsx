'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BenefitProps {
    alignment: string
    icon: string
    color: string
    children: ReactNode
}

const Benefit = ({ alignment, icon, color, children }: BenefitProps) => {
    return (
        <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.75 }}
            className={`flex flex-col ${alignment == 'left' ? 'items-start' : 'items-end'} w-[70%]`}>
            <div className='flex flex-col justify-center items-center'>
                {children}
                <div className={`rounded-full w-24 h-24 sm:w-52 sm:h-52 flex justify-center my-5 sm:my-10 items-center ${color}`}>
                    <img alt="" src={icon} className="mx-auto h-24 w-24 object-contain hover:cursor-pointer" />
                </div>
            </div >
        </motion.div >
    )
}

export default Benefit