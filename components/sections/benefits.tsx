'use client'

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion'
import Benefit from '../benefit'

const Benefits = () => {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const benefits = [
        {
            color: 'gray',
            alignment: 'left',
            text: 'Himmah is currently free to use!',
            icon: '/benefits/free.png',
        },
        {
            color: 'gray',
            alignment: 'right',
            text: 'Himmah increases motivation and focus, allowing you to become more productive!',
            icon: '/benefits/plant.png',
        },
        {
            color: 'gray',
            alignment: 'left',
            text: 'Himmah gathers all you need on one platform. No more need to open multiple apps and tabs!',
            icon: '/benefits/tabs.png',
        },
        {
            color: 'gray',
            alignment: 'right',
            text: 'Himmah is not only useful, but also attractive and easy-to-use!',
            icon: '/benefits/attractive_design.png',
        },
        {
            color: 'gray',
            alignment: 'left',
            text: 'Himmah is a very young platform, allowing you to decide its future via feedback!',
            icon: '/benefits/watering_plant.png',
        },
        {
            color: 'gray',
            alignment: 'right',
            text: 'Himmah has owners with high aspirations. Lend us your support and we will amaze you! (in shaa Allah)',
            icon: '/benefits/rocket.png',
        },
        {
            color: 'gray',
            alignment: 'left',
            text: 'Lastly, we do NOT share any information with third parties as we value your privacy!',
            icon: '/benefits/privacy.png',
        },
    ];

    return (
        <>
            <section id='benefits' className="flex w-full h-[500vh] flex-col items-center justify-center relative" ref={targetRef}>
                <motion.h2
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    className="text-6xl font-bold text-center mb-20 text-[#303030] sticky top-60"
                >
                    Why Choose Us
                </motion.h2>

                <div className="mt-64 w-full">
                    {benefits.map((benefit, index) => {
                        // Bereken de start- en eindpunten voor elke benefit
                        const start = index / benefits.length;
                        const end = (index + 1) / benefits.length;

                        // Animeren van de zichtbaarheid en positie
                        const x = useTransform(scrollYProgress, [start, end], benefit.alignment === 'left' ? [-100, 0] : [100, 0]);
                        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

                        return (
                            <motion.div
                                key={index}
                                style={{ x, opacity }}
                                className="w-full flex justify-center my-10"
                            >
                                <Benefit {...benefit} />
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </>
    )
}

export default Benefits