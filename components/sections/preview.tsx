'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { Container } from "../container"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import { focusFeatures } from "@/constants"
import { motion } from 'framer-motion'
import backgroundImage from '/public/flame.png'

const Preview = () => {
    let [tabOrientation, setTabOrientation] = useState<'horizontal' | 'vertical'>(
        'horizontal',
    )

    useEffect(() => {
        let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

        function onMediaQueryChange({ matches }: { matches: boolean }) {
            setTabOrientation(matches ? 'vertical' : 'horizontal')
        }

        onMediaQueryChange(lgMediaQuery)
        lgMediaQuery.addEventListener('change', onMediaQueryChange)

        return () => {
            lgMediaQuery.removeEventListener('change', onMediaQueryChange)
        }
    }, [])

    return (
        <>
            <motion.section
                id='features'
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.75 }}
                className="flex w-full h-[100vh] flex-col items-center justify-center"
                aria-label="Features for increasing your focus">
                <h2 className="text-6xl font-bold text-center mb-20 text-[#303030]">
                    Our Goals 🏁
                </h2>
                <ul
                    role="list"
                    className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-20  sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5"
                >
                    {focusFeatures.map((goal) => (
                        <li key={goal.title}>
                            <h3 className="mt-6 text-2xl text-center font-semibold leading-7 tracking-tight text-gray-900">
                                {goal.title}
                            </h3>
                        </li>
                    ))}
                </ul>
            </motion.section >
        </>
    )
}

export default Preview