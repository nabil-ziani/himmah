'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { Container } from "../container"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import { focusFeatures } from "@/constants"
import { motion } from 'framer-motion'
import backgroundImage from '/public/flamewave.png'

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
                id='preview'
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.75 }}
                className="flex relative w-full h-[100vh] flex-col items-center justify-center" aria-label="Features for increasing your focus">
                <Image
                    className="absolute "
                    src={backgroundImage}
                    alt=""
                    width={2245}
                    height={1636}
                    unoptimized
                />
                <Container className="relative">
                    <div>
                        <motion.h2
                            initial={{ y: 48, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ ease: 'easeInOut', duration: 0.75 }}
                            // viewport={{ once: true }} 
                            className="text-6xl font-bold text-center mb-10 text-white">
                            Tools 🛠️
                        </motion.h2>
                        <motion.div
                            initial={{ y: 48, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ ease: 'easeInOut', duration: 0.75 }}
                            // viewport={{ once: true }}
                            className='mx-auto max-w-3xl border-l-4 border-white pl-8'>
                            <p className='text-lg text-white'>
                                There are many different tools that we aim to provide on our platform.
                                For the time being however, we only provide tools to increase focus.
                            </p>
                        </motion.div>
                    </div>
                    <TabGroup
                        className="mt-10 grid grid-cols-1 items-center gap-y-2 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
                        vertical={tabOrientation === 'vertical'}
                    >
                        {({ selectedIndex }) => (
                            <>
                                <div className="flex pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                                    <TabList className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                                        {focusFeatures.map((feature, featureIndex) => (
                                            <div
                                                key={feature.title}
                                                className={clsx(
                                                    'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                                                    selectedIndex === featureIndex
                                                        ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                                                        : 'hover:bg-white/10 lg:hover:bg-white/5',
                                                )}
                                            >
                                                <h3>
                                                    <Tab
                                                        className={clsx(
                                                            'font-display text-lg ui-not-focus-visible:outline-none',
                                                            selectedIndex === featureIndex
                                                                ? 'text-blue-600 lg:text-white'
                                                                : 'text-blue-100 hover:text-white lg:text-white',
                                                        )}
                                                    >
                                                        <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                                                        {feature.title}
                                                    </Tab>
                                                </h3>
                                                <p
                                                    className={clsx(
                                                        'mt-2 hidden text-sm lg:block',
                                                        selectedIndex === featureIndex
                                                            ? 'text-white'
                                                            : 'text-blue-100 group-hover:text-white',
                                                    )}
                                                >
                                                    {feature.description}
                                                </p>
                                            </div>
                                        ))}
                                    </TabList>
                                </div>
                                <TabPanels className="lg:col-span-7">
                                    {focusFeatures.map((feature) => (
                                        <TabPanel key={feature.title} unmount={false}>
                                            <div className="relative sm:px-6 lg:hidden">
                                                <div className="absolute bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                                                <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                                                    {feature.description}
                                                </p>
                                            </div>
                                            <div className="w-full mt-10 overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-gray-900/20 sm:w-auto lg:mt-0">
                                                <Image
                                                    src={feature.image}
                                                    alt=""
                                                    priority
                                                    sizes="(min-width: 1024px) 50rem, (min-width: 640px) 100vw, 45rem"
                                                />
                                            </div>
                                        </TabPanel>
                                    ))}
                                </TabPanels>
                            </>
                        )}
                    </TabGroup>
                </Container>
            </motion.section>
        </>
    )
}

export default Preview