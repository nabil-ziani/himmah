'use client'

import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useSpring } from 'framer-motion';
import Benefit from '../benefit';

const Benefits = () => {
    const targetRef = useRef(null);

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

    const totalSteps = benefits.length;
    const scrollYProgress = useSpring(0, { stiffness: 50, damping: 20 });

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event: { deltaY: number; preventDefault: () => void; }) => {
        const delta = event.deltaY;
        const step = delta > 0 ? 1 : -1;
        let nextIndex = currentIndex + step;

        // Clamp the index between 0 and totalSteps - 1
        nextIndex = Math.max(0, Math.min(nextIndex, totalSteps - 1));

        setCurrentIndex(nextIndex);

        // Update the scroll progress
        scrollYProgress.set(nextIndex / totalSteps);

        // Prevent default scroll behavior
        event.preventDefault();
    };

    useEffect(() => {
        // Add scroll listener
        window.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            // Remove scroll listener on cleanup
            window.removeEventListener('wheel', handleScroll);
        };
    }, [currentIndex]);

    return (
        <section id='benefits' ref={targetRef} className="w-full h-screen flex flex-col items-center pt-[20vh] overflow-hidden sticky bg-slate-200">
            <motion.h2
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.75 }}
                className="text-6xl font-bold text-center mb-20 text-[#303030]"
            >
                Why Choose Us
            </motion.h2>

            <div className="w-full relative">
                {benefits.map((benefit, index) => {
                    const isActive = index === currentIndex;
                    const opacity = useTransform(scrollYProgress, value => (isActive ? 1 : 0));
                    const y = useTransform(scrollYProgress, value => (isActive ? 0 : 100));

                    return (
                        <motion.div
                            key={index}
                            style={{ opacity, y }}
                            className={`flex w-full justify-center absolute ${isActive ? 'top-32' : 'top-52'}`}
                        >
                            <Benefit {...benefit} />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Benefits;