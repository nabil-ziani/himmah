'use client'

import { focusFeatures } from "@/constants"
import { motion } from 'framer-motion'

const Features = () => {
    return (
        <>
            <section id='tools' className="flex w-full my-20 sm:h-[100vh] flex-col items-center justify-center">
                <motion.h2
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    className="text-4xl sm:text-6xl font-bold text-center mb-10 sm:mb-20 text-[#303030]">
                    Tools
                </motion.h2>
                <motion.div
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    className='mx-auto max-w-7xl text-center px-8'>
                    <p className='text-md sm:text-xl leading-relaxed'>
                        We intend to be a complete platform with tools for focusing, planning, learning, relaxation, communicating and much more.
                        Everything necessary to be productive will be gathered on one platform in the most optimal way for you.
                        For the time being, due to our platform being new, we only provide tools for focus. The main tools are:
                    </p>

                    <ul
                        role="list"
                        className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-x-20  sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5"
                    >
                        {focusFeatures.map((feature) => (
                            <li key={feature.title} className="my-5 sm:my-0">
                                <motion.img
                                    alt=""
                                    src={feature.image}
                                    className="mx-auto h-40 w-[70vw] sm:w-40 object-cover rounded-lg hover:cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} />
                                <h3 className="mt-1 sm:mt-3 text-lg text-center font-semibold leading-7 tracking-tight text-gray-900">
                                    {feature.title}
                                </h3>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </section >
        </>
    )
}

export default Features