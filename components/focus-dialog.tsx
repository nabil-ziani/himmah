'use client'

import { useInterval } from "@mantine/hooks"
import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button } from "./ui/button"

interface FocusDialogProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    mode: 'timer' | 'stopwatch',
    totalSeconds: number // Aantal seconden rechtstreeks vanuit Timer component
}

const FocusDialog = ({ isOpen, setIsOpen, mode, totalSeconds }: FocusDialogProps) => {
    const [seconds, setSeconds] = useState(totalSeconds);

    const interval = useInterval(() => {
        setSeconds((s) => s - 1);
    }, 1000);

    // Bijwerken van de 'seconds' waarde wanneer de dialog wordt geopend
    useEffect(() => {
        if (isOpen) {
            setSeconds(totalSeconds); // Update de seconden met de nieuwe waarde van Timer component
            interval.start(); // Start de timer zodra de dialog wordt geopend
        } else {
            interval.stop(); // Stop de timer wanneer de dialog wordt gesloten
        }
    }, [isOpen, totalSeconds]);

    // Stop de timer wanneer de tijd voorbij is
    useEffect(() => {
        if (seconds <= 0) {
            interval.stop();
        }
    }, [seconds]);

    useEffect(() => {
        return interval.stop; // Zorg ervoor dat de interval stopt bij unmount
    }, []);

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
                        {mode === 'timer' && (
                            <div className="h-full justify-center flex flex-col items-center">
                                <div className="flex items-center justify-center text-[126px] text-[#323238] font-nunito font-semibold max-w-[321px] dark:text-white">
                                    <div>{Math.floor(seconds / 60).toString().padStart(2, '0')}</div>
                                    <div>:</div>
                                    <div>{(seconds % 60).toString().padStart(2, '0')}</div>
                                </div>
                                <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                                    <Button size={"lg"} className="bg-[#e74c3c] hover:bg-[#e74c3c]/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={() => {
                                        interval.stop();
                                        setSeconds(totalSeconds); // Reset timer naar oorspronkelijke waarde
                                        setIsOpen(false);
                                    }}>
                                        Give up
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div >
            )}
        </AnimatePresence>
    );
};

export default FocusDialog;