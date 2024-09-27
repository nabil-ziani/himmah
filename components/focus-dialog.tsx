'use client'

import { useInterval } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Affirmation } from "@/lib/types";
import { Blockquote, BlockquoteAuthor } from "./quote";

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
    affirmations: Affirmation[]
}

const FocusDialog = ({ isOpen, mode, time, isRunning, setIsRunning, setTime, audio, backgrounds, handleSessionEnd, affirmations }: FocusDialogProps) => {
    const [timerCompleted, setTimerCompleted] = useState(false)
    const [seconds, setSeconds] = useState<number>(Number(time.seconds))
    const [minutes, setMinutes] = useState<number>(Number(time.minutes))

    const [backgroundIndex, setBackgroundIndex] = useState(0)
    const [currentBackground, setCurrentBackground] = useState<string>(backgrounds[0])

    const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation>(affirmations[0])

    const audioRef = useRef<HTMLAudioElement>(null);

    // Interval for 1 second
    const interval = useInterval(() => {
        if (mode === 'timer') {
            if (seconds > 0) {
                setSeconds((s) => s - 1)
            } else if (seconds === 0 && minutes > 0) {
                setMinutes((m) => m - 1);
                setSeconds(59)
            } else if (minutes === 0 && seconds === 0) {
                setTimerCompleted(true)
                handleTimerMode()
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
            interval.start()
        } else {
            interval.stop()
        }
    }, [isOpen, isRunning, mode, interval])

    // Cleanup interval on unmount
    useEffect(() => {
        return interval.stop
    }, [])

    // Change background every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length)
        }, 60000)

        return () => clearInterval(interval)
    }, [backgrounds.length])

    useEffect(() => {
        setCurrentBackground(backgrounds[backgroundIndex])
    }, [backgroundIndex, backgrounds])

    // Change affirmation every minute
    useEffect(() => {
        const affirmationInterval = setInterval(() => {
            setCurrentAffirmation(getRandomAffirmation(affirmations))
        }, 60000); // 1 minuut interval

        return () => clearInterval(affirmationInterval)
    }, [affirmations])

    const handleTimerMode = async () => {
        interval.stop()

        if (audioRef.current && timerCompleted) {
            await audioRef.current.play()
        }
    }

    const handleStopwatchMode = async () => {
        setIsRunning?.(false)
        handleSessionEnd(true)
    }

    const getRandomAffirmation = (affirmations: Affirmation[]) => {
        return affirmations[Math.floor(Math.random() * affirmations.length)];
    }

    return (
        isOpen && (
            <div className="fixed inset-0 z-50 overflow-y-scroll">
                <motion.div
                    className="w-full h-full bg-white relative grid place-items-center"
                    style={{ backgroundImage: `url(${currentBackground})`, backgroundSize: 'cover' }}
                    key={backgroundIndex}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 1 }}
                >
                    {currentAffirmation && (
                        <Blockquote className="absolute top-28 max-w-[60vw]">
                            {currentAffirmation.verse}
                            <BlockquoteAuthor>{currentAffirmation?.surah} {currentAffirmation?.ayah}</BlockquoteAuthor>
                        </Blockquote>
                    )}
                    <div className="flex justify-center flex-col items-center">
                        <div className="flex items-center justify-center text-[200px] text-[#323238] font-nunito font-semibold max-w-[321px] dark:text-white">
                            <div className="flex bg-white/70 px-20 mb-10 rounded-3xl">
                                <div>
                                    {minutes.toString().padStart(2, '0')}
                                </div>
                                <div>{" "}:{" "}</div>
                                <div>
                                    {seconds.toString().padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                            {timerCompleted ?
                                (
                                    <Button className="bg-green-400 font-semibold text-4xl text-white h-16 rounded-xl px-8" onClick={() => {
                                        setTimerCompleted(false)
                                        handleSessionEnd(true)
                                    }}>
                                        Claim Victory 🏆
                                    </Button>
                                ) : (
                                    <Button className="bg-red-500 font-semibold text-4xl text-white h-16 rounded-xl px-8" onClick={mode === 'timer' ? () => handleSessionEnd(false) : handleStopwatchMode}>
                                        {mode === 'timer' ? 'Give up' : 'Stop'}
                                    </Button>
                                )
                            }
                        </div>
                    </div>

                    {/* White Noise */}
                    <audio className="hidden" src={audio} loop={true} autoPlay={true} />

                    {/* Notification Sound */}
                    <audio ref={audioRef} src="/audio/level_up.mp3" crossOrigin="anonymous" loop={false} onEnded={() => audioRef.current?.pause()} />
                </motion.div>
            </div >
        )
    )
}

export default FocusDialog