'use client'

import { useInterval } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";

interface FocusDialogProps {
    isOpen: boolean
    mode: 'timer' | 'stopwatch'
    time: { minutes: string | number, seconds: string | number }
    isRunning?: boolean
    setIsRunning?: Dispatch<SetStateAction<boolean>>
    setTime: Dispatch<SetStateAction<number>>
    audio: string
    backgrounds: string[]
    handleSessionEnd: (completed: boolean) => Promise<void>
}

const FocusDialog = ({ isOpen, mode, time, isRunning, setIsRunning, setTime, audio, backgrounds, handleSessionEnd }: FocusDialogProps) => {
    const [seconds, setSeconds] = useState<number>(Number(time.seconds))
    const [minutes, setMinutes] = useState<number>(Number(time.minutes))

    const [backgroundIndex, setBackgroundIndex] = useState(0)
    const [currentBackground, setCurrentBackground] = useState<string>(backgrounds[0])

    // Interval for 1 second
    const interval = useInterval(() => {
        if (mode === 'timer') {
            if (seconds > 0) {
                setSeconds((s) => s - 1);
            } else if (seconds === 0 && minutes > 0) {
                setMinutes((m) => m - 1);
                setSeconds(59);
            } else if (minutes === 0 && seconds === 0) {
                interval.stop();
                handleSessionEnd(true);
            }
        } else if (mode === 'stopwatch' && isRunning) {
            setTime?.((prevTime) => prevTime + 100)
        }
    }, 1000)

    // Update values when props change
    useEffect(() => {
        setMinutes(Number(time.minutes))
        setSeconds(Number(time.seconds))
    }, [time])

    // Start and stop the interval depending on the mode
    useEffect(() => {
        if (isOpen && (mode === 'timer' || isRunning)) {
            interval.start();
        } else {
            interval.stop();
        }
    }, [isOpen, isRunning, mode, interval]);

    // Cleanup interval on unmount
    useEffect(() => {
        return interval.stop
    }, [])

    // Change background every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length)
        }, 10000)

        return () => clearInterval(interval)
    }, [backgrounds.length])

    useEffect(() => {
        setCurrentBackground(backgrounds[backgroundIndex])
    }, [backgroundIndex, backgrounds])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 grid place-items-center overflow-y-scroll">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-full bg-white relative grid place-items-center"
                        style={{ backgroundImage: `url(${currentBackground})`, backgroundSize: 'cover' }}
                    >
                        {/* Timer-modus */}
                        {mode === 'timer' && (
                            <div className="h-full justify-center flex flex-col items-center">
                                <div className=" flex items-center justify-center text-[126px] text-[#323238] font-nunito font-semibold max-w-[321px] dark:text-white">
                                    <div>{minutes.toString().padStart(2, '0')}</div>
                                    <div>:</div>
                                    <div>{seconds.toString().padStart(2, '0')}</div>
                                </div>
                                <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                                    <Button size={"lg"} className="bg-[#e74c3c] hover:bg-[#e74c3c]/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={() => {
                                        interval.stop()
                                        handleSessionEnd(true)
                                    }}>
                                        Give up
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Stopwatch-modus */}
                        {mode === 'stopwatch' && (
                            <div className="h-full justify-center flex flex-col items-center">
                                <div className="flex items-center justify-center text-[126px] text-[#323238] font-nunito font-semibold max-w-[321px] dark:text-white">
                                    <div>{minutes.toString().padStart(2, '0')}</div>
                                    <div>:</div>
                                    <div>{seconds.toString().padStart(2, '0')}</div>
                                </div>
                                <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                                    <Button size={"lg"} className="bg-[#e74c3c] hover:bg-[#e74c3c]/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={() => {
                                        setIsRunning?.(false)
                                        handleSessionEnd(true)
                                    }}>
                                        Stop
                                    </Button>
                                </div>
                            </div>
                        )}

                        <audio
                            className="hidden"
                            src={audio}
                            loop={true}
                            autoPlay={true}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default FocusDialog;