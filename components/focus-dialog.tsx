'use client'

import { useInterval } from "@mantine/hooks"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Affirmation } from "@/lib/types"
import { Blockquote, BlockquoteAuthor } from "./quote"
import { useStore } from "@/hooks/useStore"
import { motion } from "framer-motion"

interface FocusDialogProps {
    isOpen: boolean
    mode: 'timer' | 'stopwatch'
    time: { minutes: string | number, seconds: string | number }
    isRunning?: boolean
    setIsRunning?: Dispatch<SetStateAction<boolean>>
    setTime: Dispatch<SetStateAction<number>>
    handleSessionEnd: (completed: boolean) => Promise<void>
}

const FocusDialog = ({ isOpen, mode, time, isRunning, setIsRunning, setTime, handleSessionEnd }: FocusDialogProps) => {
    const [timerCompleted, setTimerCompleted] = useState(false)
    const [seconds, setSeconds] = useState<number>(Number(time.seconds))
    const [minutes, setMinutes] = useState<number>(Number(time.minutes))

    const { affirmationsInterval, backgroundsInterval, audio, affirmations, selectedBackgrounds: backgrounds } = useStore()

    const [backgroundIndex, setBackgroundIndex] = useState(0)
    const [currentBackground, setCurrentBackground] = useState<string>(backgrounds[0])

    const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation>(affirmations[0])

    const [hasPlayedAudio, setHasPlayedAudio] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const elapsedBackgroundTime = useRef(0)
    const elapsedAffirmationTime = useRef(0)

    // --- Interval for 1 second ---
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

        elapsedBackgroundTime.current += 1
        elapsedAffirmationTime.current += 1

        if (elapsedBackgroundTime.current >= backgroundsInterval * 60) {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
            elapsedBackgroundTime.current = 0
        }

        if (elapsedAffirmationTime.current >= affirmationsInterval * 60) {
            const randomAffirmation = getRandomAffirmation(affirmations);
            setCurrentAffirmation(randomAffirmation);
            elapsedAffirmationTime.current = 0
        }
    }, 1000)

    // --- Update values when props change ---
    useEffect(() => {
        setMinutes(Number(time.minutes))
        setSeconds(Number(time.seconds))
    }, [time])

    // --- Start and stop the interval depending on the mode ---
    useEffect(() => {
        if (isOpen) {
            elapsedBackgroundTime.current = 0
            elapsedAffirmationTime.current = 0

            interval.start()
        } else {
            interval.stop()
        }
    }, [isOpen])

    // --- Cleanup interval on unmount ---
    useEffect(() => {
        return interval.stop
    }, [])

    // --- Set background ---
    useEffect(() => {
        setCurrentBackground(backgrounds[backgroundIndex])
    }, [backgroundIndex, backgrounds])

    // --- Initial affirmation on component mount ---
    useEffect(() => {
        const randomAffirmation = getRandomAffirmation(affirmations)
        setCurrentAffirmation(randomAffirmation)
    }, [affirmations])

    // --- Reset audio state wanneer de timer wordt gereset of herstart ---
    useEffect(() => {
        if (!timerCompleted) {
            setHasPlayedAudio(false)
        }
    }, [timerCompleted])

    const handleTimerMode = async () => {
        if (timerCompleted && !hasPlayedAudio) {
            if (audioRef.current) {
                await audioRef.current.play()
                setHasPlayedAudio(true)
            }
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
            <div className="fixed inset-0 z-50 overflow-y-scroll w-full h-[100vh] bg-white">
                <motion.img
                    alt="focus-background"
                    src={currentBackground}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <div className={`w-full h-full relative grid place-items-center `}>
                    {currentAffirmation && (
                        <Blockquote className="absolute top-20 max-w-[60vw]">
                            {currentAffirmation.verse}
                            <BlockquoteAuthor>{currentAffirmation?.surah} {currentAffirmation?.ayah}</BlockquoteAuthor>
                        </Blockquote>
                    )}
                    <div className="flex justify-center flex-col items-center">
                        <div className="flex items-center justify-center text-[200px] text-[#323238] font-nunito font-semibold max-w-[321px] dark:text-white">
                            <div className="flex bg-white/60 backdrop-blur-lg backdrop-filter px-20 mb-10 rounded-3xl">
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
                    <audio ref={audioRef} src="/audio/kitchen_timer.mp3" crossOrigin="anonymous" onEnded={() => audioRef.current?.pause()} />
                </div>
            </div >
        )
    )
}

export default FocusDialog