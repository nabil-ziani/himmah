'use client'

import { motion } from 'framer-motion'

interface BenefitProps {
    alignment: string
    text: string
    icon: string
    color: string
}

const Benefit = ({ alignment, text, icon, color }: BenefitProps) => {
    return (
        <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.75 }}
            // viewport={{ once: true }}
            className={`flex flex-col ${alignment == 'left' ? 'items-start' : 'items-end'} w-[70%]`}>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-2xl text-center leading-relaxed w-[600px] max-w-[90%]'>
                    {text}
                </p>
                <div className={`rounded-full w-52 h-52 flex justify-center mt-10 items-center bg-gray-200`}>
                    <img alt="" src={icon} className="mx-auto h-20 w-20 rounded-full hover:cursor-pointer" />
                </div>
            </div >
        </motion.div >
    )
}

export default Benefit