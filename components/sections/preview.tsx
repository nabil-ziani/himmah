'use client'

import { useState } from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "../ui/button"
import { ChartNoAxesCombined, ChevronLeftIcon, ChevronRightIcon, Hourglass, MessageCircleHeart, MountainSnow, Waves } from "lucide-react"
import { StopwatchIcon } from "@radix-ui/react-icons"

import { motion } from 'framer-motion'

const Preview = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleButtonClick = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <>
            <section id='preview' className="flex w-full h-[100vh] flex-col items-center justify-center">
                <motion.h2
                    initial={{ y: 48, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.75 }}
                    className="text-6xl font-bold text-center mb-10 text-[#303030]">
                    Focus 🎯
                </motion.h2>
                <div className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Features</h2>
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="justify-start gap-3" onClick={() => handleButtonClick(0)}>
                                    <Hourglass className="w-5 h-5" />
                                    <span>Timers</span>
                                </Button>
                                <Button variant="outline" className="justify-start gap-3" onClick={() => handleButtonClick(1)}>
                                    <StopwatchIcon className="w-5 h-5" />
                                    <span>Stopwatch</span>
                                </Button>
                                <Button variant="outline" className="justify-start gap-3" onClick={() => handleButtonClick(2)}>
                                    <MountainSnow className="w-5 h-5" />
                                    <span>Backgrounds</span>
                                </Button>
                                <Button variant="outline" className="justify-start gap-3" onClick={() => handleButtonClick(3)}>
                                    <MessageCircleHeart className="w-5 h-5" />
                                    <span>Affirmations</span>
                                </Button>
                                <Button variant="outline" className="justify-start gap-3" onClick={() => handleButtonClick(4)}>
                                    <Waves className="w-5 h-5" />
                                    <span>White Noise</span>
                                </Button>
                                <Button variant="outline" className="justify-start gap-3" onClick={() => handleButtonClick(5)}>
                                    <ChartNoAxesCombined className="w-5 h-5" />
                                    <span>Analytics</span>
                                </Button>
                            </div>
                        </div>
                        <div className="md:col-span-7 lg:col-span-8">
                            <Carousel className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
                                <CarouselContent>
                                    <CarouselItem>
                                        <div className="flex flex-col gap-4 h-full">
                                            <img
                                                src="/placeholder.png"
                                                alt="Feature 1"
                                                width={800}
                                                height={500}
                                                className="w-full h-full object-cover rounded-lg"
                                                style={{ aspectRatio: "800/500", objectFit: "cover" }}
                                            />
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-2xl md:text-3xl font-bold">Timers</h3>
                                                <p className="text-muted-foreground text-lg md:text-xl">
                                                    Set precise focus sessions with our timers, driving your productivity and keeping you motivated every step of the way.
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="flex flex-col gap-4 h-full">
                                            <img
                                                src="/placeholder.png"
                                                alt="Feature 2"
                                                width={800}
                                                height={500}
                                                className="w-full h-full object-cover rounded-lg"
                                                style={{ aspectRatio: "800/500", objectFit: "cover" }}
                                            />
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-2xl md:text-3xl font-bold">Stopwatch</h3>
                                                <p className="text-muted-foreground text-lg md:text-xl">
                                                    Track your focus time with our stopwatch, pushing your limits and fueling your motivation as you see your progress in real-time.
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="flex flex-col gap-4 h-full">
                                            <img
                                                src="/placeholder.png"
                                                alt="Feature 3"
                                                width={800}
                                                height={500}
                                                className="w-full h-full object-cover rounded-lg"
                                                style={{ aspectRatio: "800/500", objectFit: "cover" }}
                                            />
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-2xl md:text-3xl font-bold">Backgrounds</h3>
                                                <p className="text-muted-foreground text-lg md:text-xl">
                                                    Transform your workspace with immersive backgrounds that eliminate distractions and help you dive into the ultimate focus zone.
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="flex flex-col gap-4 h-full">
                                            <img
                                                src="/placeholder.png"
                                                alt="Feature 4"
                                                width={800}
                                                height={500}
                                                className="w-full h-full object-cover rounded-lg"
                                                style={{ aspectRatio: "800/500", objectFit: "cover" }}
                                            />
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-2xl md:text-3xl font-bold">Affirmations</h3>
                                                <p className="text-muted-foreground text-lg md:text-xl">
                                                    Boost your mindset with powerful affirmations that reinforce key truths, reshape your thinking, and keep you motivated to stay on track.
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="flex flex-col gap-4 h-full">
                                            <img
                                                src="/placeholder.png"
                                                alt="Feature 3"
                                                width={800}
                                                height={500}
                                                className="w-full h-full object-cover rounded-lg"
                                                style={{ aspectRatio: "800/500", objectFit: "cover" }}
                                            />
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-2xl md:text-3xl font-bold">White Noise</h3>
                                                <p className="text-muted-foreground text-lg md:text-xl">
                                                    Enhance your focus or relaxation with calming white noise, featuring natural sounds that create the perfect auditory backdrop.
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="flex flex-col gap-4 h-full">
                                            <img
                                                src="/placeholder.png"
                                                alt="Feature 3"
                                                width={800}
                                                height={500}
                                                className="w-full h-full object-cover rounded-lg"
                                                style={{ aspectRatio: "800/500", objectFit: "cover" }}
                                            />
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-2xl md:text-3xl font-bold">Analytics</h3>
                                                <p className="text-muted-foreground text-lg md:text-xl">
                                                    Unlock deeper insights into your productivity with our analytics, empowering you to refine your focus and achieve even more.
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
                                    <Button variant="ghost" size="icon" onClick={() => handleButtonClick(activeIndex - 1)}>
                                        <ChevronLeftIcon className="w-6 h-6" />
                                        <span className="sr-only">Previous</span>
                                    </Button>
                                </CarouselPrevious>
                                <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
                                    <Button variant="ghost" size="icon" onClick={() => handleButtonClick(activeIndex + 1)}>
                                        <ChevronRightIcon className="w-6 h-6" />
                                        <span className="sr-only">Next</span>
                                    </Button>
                                </CarouselNext>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Preview