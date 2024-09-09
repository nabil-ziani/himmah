'use client'

import { useInterval } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";

interface FocusDialogProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    mode: 'timer' | 'stopwatch',
    totalSeconds?: number, // Voor de timer
    time?: { minutes: string | number, seconds: string | number }, // Voor de stopwatch
    isRunning?: boolean, // Voor stopwatch functionaliteit
    setIsRunning?: Dispatch<SetStateAction<boolean>>,
    setTime?: Dispatch<SetStateAction<number>> // Om de tijd bij te werken
}

const FocusDialog = ({ isOpen, setIsOpen, mode, totalSeconds, time, isRunning, setIsRunning, setTime }: FocusDialogProps) => {
    const [seconds, setSeconds] = useState<number>(mode === 'timer' ? totalSeconds! % 60 : Number(time?.seconds));
    const [minutes, setMinutes] = useState<number>(mode === 'timer' ? Math.floor(totalSeconds! / 60) : Number(time?.minutes));

    const interval = useInterval(() => {
        if (mode === 'timer') {
            if (seconds > 0) {
                setSeconds((s) => s - 1);
            } else if (seconds === 0 && minutes > 0) {
                setMinutes((m) => m - 1);
                setSeconds(59);
            }
        } else if (mode === 'stopwatch' && isRunning) {
            setTime?.((prevTime) => prevTime + 100); // Update in honderdsten van seconden
        }
    }, 1000); // Interval van 1000 milliseconden voor volledige seconden

    // Bijwerken van de waarden wanneer props veranderen
    useEffect(() => {
        if (mode === 'timer' && totalSeconds !== undefined) {
            setMinutes(Math.floor(totalSeconds / 60));
            setSeconds(totalSeconds % 60);
        } else if (mode === 'stopwatch' && time) {
            setMinutes(Number(time.minutes));
            setSeconds(Number(time.seconds));
        }
    }, [totalSeconds, time, mode]);

    // Starten en stoppen van de interval afhankelijk van de toestand
    useEffect(() => {
        if (isOpen) {
            if (mode === 'timer') {
                interval.start();
            } else if (isRunning) {
                interval.start();
            }
        } else {
            interval.stop();
        }
    }, [isOpen, isRunning, mode, interval]);

    // Stop interval bij sluiten component
    useEffect(() => {
        return interval.stop;
    }, []);

    // Bereken de seconden en minuten opnieuw wanneer de tijd in honderdsten van seconden wordt bijgewerkt
    const currentMinutes = Math.floor((Number(time?.minutes) || 0) + seconds / 60);
    const currentSeconds = seconds % 60;

    return (
        <AnimatePresence>
            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 grid place-items-center overflow-y-scroll">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-full bg-white relative grid place-items-center"
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
                                        interval.stop();
                                        setIsOpen(false);
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
                                    <div>{currentMinutes.toString().padStart(2, '0')}</div>
                                    <div>:</div>
                                    <div>{currentSeconds.toString().padStart(2, '0')}</div>
                                </div>
                                <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                                    <Button size={"lg"} className="bg-[#e74c3c] hover:bg-[#e74c3c]/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={() => {
                                        interval.stop();
                                        setIsRunning?.(false);
                                        setIsOpen(false);
                                    }}>
                                        Stop Stopwatch
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FocusDialog;