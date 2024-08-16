'use client'

import { motion } from 'framer-motion'

interface BenefitProps {
    alignment: 'left' | 'right'
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
            className={`flex flex-col w-full ${alignment == 'left' ? 'items-start' : 'items-end'} justify-center p-10 gap-x-80`}>
            <div className='flex justify-center items-center flex-col'>
                <p className='text-xl leading-relaxed max-w-[50%]'>
                    {text}
                </p>
                <div className={`rounded-full w-44 h-44 flex justify-center mt-10 items-center bg-${color}-200`}>
                    <img alt="" src={icon} className="mx-auto h-20 w-20 rounded-full hover:cursor-pointer" />
                </div>
            </div>
        </motion.div>
    )
}

export default Benefit