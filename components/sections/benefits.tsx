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

                <Benefit color={'bg-red-50'} alignment='left' icon='/benefits/free.png'>
                    <p className='text-2xl text-center leading-relaxed w-[600px]'>
                        Himmah is currently <span className='font-bold'>free to use!</span>
                    </p>
                </Benefit>
                <Benefit color={'bg-green-50'} alignment='right' icon='/benefits/plant.png'>
                    <p className='text-2xl text-center leading-relaxed w-[600px]'>
                        Himmah increases motivation and focus, allowing you to become more <span className='font-bold'>productive!</span>
                    </p>
                </Benefit>
                <Benefit color={'bg-slate-200'} alignment='left' icon='/benefits/tabs.png'>
                    <p className='text-2xl text-center leading-relaxed w-[600px]'>
                        Himmah gathers all you need on <span className='font-bold'>one platform.</span> No more need to open multiple apps and tabs!
                    </p>
                </Benefit>
                <Benefit color={'bg-orange-50'} alignment='right' icon='/benefits/attractive_design.png'>
                    <p className='text-2xl text-center leading-relaxed w-[600px]'>
                        Himmah is not only useful, but also <span className='font-bold'>attractive</span> and <span className='font-bold'>easy-to-use!</span>
                    </p>
                </Benefit>
                <Benefit color={'bg-gray-50'} alignment='left' icon='/benefits/watering_plant.png'>
                    <p className='text-2xl text-center leading-relaxed w-[600px]'>
                        Himmah is a very young platform, allowing you to decide its future via <span className='font-bold'>feedback!</span>
                    </p>
                </Benefit>
                <Benefit color={'bg-purple-50'} alignment='right' icon='/benefits/rocket.png'>
                    <p className='text-2xl text-center leading-relaxed w-[600px]'>
                        Himmah has owners with <span className='font-bold'>high aspirations.</span> Lend us your support and we will amaze you! <span className='text-gray-600'>(in shaa Allah)</span>
                    </p>
                </Benefit>
                <Benefit color={'gray'} alignment='left' icon='/benefits/privacy.png'>
                    <p className='text-2xl text-center leading-relaxed w-[600px]'>
                        Lastly, we do NOT share any information with third parties as we <span className='font-bold'>value your privacy!</span>
                    </p>
                </Benefit>
            </section>
        </>
    )
}

export default Benefits