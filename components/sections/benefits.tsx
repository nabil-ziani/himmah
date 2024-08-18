'use client'

import { motion } from 'framer-motion'
import Benefit from '../benefit'

const Benefits = () => {
    return (
        <>
            <section id='benefits' className="flex w-full h-fit flex-col items-center justify-center">
                <motion.h2
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    // viewport={{ once: true }}
                    className="text-6xl font-bold text-center mb-20 text-[#303030]">
                    Why Choose Us
                </motion.h2>

                <Benefit color={'gray'} alignment='left' text='Himmah is currently free to use!' icon='/benefits/free.png' />
                <Benefit color={'gray'} alignment='right' text='Himmah increases motivation and focus, allowing you to become more productive!' icon='/benefits/plant.png' />
                <Benefit color={'gray'} alignment='left' text='Himmah gathers all you need on one platform. No more need to open multiple apps and tabs!' icon='/benefits/tabs.png' />
                <Benefit color={'gray'} alignment='right' text='Himmah is not only useful, but also attractive and easy-to-use!' icon='/benefits/attractive_design.png' />
                <Benefit color={'gray'} alignment='left' text='Himmah is a very young platform, allowing you to decide its future via feedback!' icon='/benefits/watering_plant.png' />
                <Benefit color={'gray'} alignment='right' text='Himmah has owners with high aspirations. Lend us your support and we will amaze you! (in shaa Allah)' icon='/benefits/rocket.png' />
                <Benefit color={'gray'} alignment='left' text='Lastly, we do NOT share any information with third parties as we value your privacy!' icon='/benefits/privacy.png' />
            </section>
        </>
    )
}

export default Benefits