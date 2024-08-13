'use client'

import { motion } from 'framer-motion'

const Tools = () => {
    return (
        <>
            <section id='tools' className="flex w-full h-[80vh] flex-col items-center justify-center">
                <motion.h2
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    // viewport={{ once: true }} 
                    className="text-6xl font-bold text-center mb-20 text-[#303030]">
                    Tools 🛠️
                </motion.h2>
                <motion.div
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    // viewport={{ once: true }}
                    className='mx-auto max-w-3xl border-l-4 border-[#303030] pl-8'>
                    <p className='text-lg'>
                        There are many different tools that we aim to provide on our platform.
                        For the time being however, we only provide tools to increase focus.
                    </p>
                </motion.div>
            </section>
        </>
    )
}

export default Tools