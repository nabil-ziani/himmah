'use client'

import { motion } from 'framer-motion'

const About = () => {
    return (
        <>
            <section id='about' className="flex w-full h-[100vh] flex-col items-center justify-center">
                <motion.h2
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    // viewport={{ once: true }}
                    className="text-6xl font-bold text-center mb-20 text-[#303030]">
                    Himmah ✨
                </motion.h2>
                <motion.div
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    // viewport={{ once: true }}
                    className='mx-auto max-w-3xl border-l-4 border-[#303030] pl-8'>
                    <p className='text-lg'>
                        Himmah is a platform for Muslims.
                        It is meant to empower Muslims by increasing their productivity and instilling zeal within them.
                        These goals we aim to achieve by providing Muslims with various tools.
                    </p>
                </motion.div>
            </section >
        </>
    )
}

export default About