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
                    About Us ✨
                </motion.h2>
                <motion.div
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    // viewport={{ once: true }}
                    className='mx-auto max-w-6xl text-center px-8'>
                    <p className='text-xl leading-relaxed'>
                        Himmah is a platform that is meant to empower Muslims by increasing their productivity and zeal.
                        As Muslims suffer from distractions, self-doubt, weakness and many more issues, we want to provide a solution.
                        We hope to create more successful Muslims, who will please Allah and strive to create a better world.
                    </p>
                </motion.div>
            </section >
        </>
    )
}

export default About