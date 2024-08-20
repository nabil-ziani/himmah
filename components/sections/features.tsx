'use client'

import { focusFeatures } from "@/constants"
import { motion } from 'framer-motion'

const Features = () => {
    return (
        <>
            <section id='tools' className="flex w-full h-[100vh] flex-col items-center justify-center">
                <motion.h2
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    // viewport={{ once: true }}
                    className="text-6xl font-bold text-center mb-20 text-[#303030]">
                    Tools
                </motion.h2>
                <motion.div
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    // viewport={{ once: true }}
                    className='mx-auto max-w-7xl text-center px-8'>
                    <p className='text-xl leading-relaxed mb-20'>
                        We intend to be a complete platform with tools for focus, planning, relaxing, communicating and much more.
                        Everything necessary to be productive will be gathered on one platform in the most optimal way for you.
                        For the time being, due to our platform being new, we only provide tools for focus. The main tools are:
                    </p>

                    <ul
                        role="list"
                        className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-x-20  sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5"
                    >
                        {focusFeatures.map((feature) => (
                            <li key={feature.title} onClick={() => {
                                // setContent({ title: goal.title, description: goal.description, image: goal.image })
                                // setIsOpen(true)
                            }}>
                                <motion.img
                                    alt=""
                                    src={feature.image}
                                    className="mx-auto h-40 w-40 object-cover rounded-lg hover:cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} />
                                <h3 className="mt-6 text-lg text-center font-semibold leading-7 tracking-tight text-gray-900">
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