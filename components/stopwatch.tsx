'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Timer } from 'lucide-react';

interface StopwatchProps {
    changeMode: Dispatch<SetStateAction<"timer" | "stopwatch">>
}

const Stopwatch = ({ changeMode }: StopwatchProps) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId: any;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    // Hours calculation
    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;

    // Method to start and stop timer
    const startStop = () => {
        setIsRunning(!isRunning);
    };

    // Method to reset timer back to 0
    const reset = () => {
        setTime(0);
    };

    return (
        <div className="h-full justify-center flex flex-col items-center">
            <div className="flex items-center justify-center text-[126px] text-[#323238] font-[500] dark:text-white font-mono">
                <div>
                    {hours}:
                </div>
                <div>
                    {minutes.toString().padStart(2, "0")}:
                </div>
                <div>
                    {seconds.toString().padStart(2, "0")}:
                </div>
                <div>
                    {milliseconds.toString().padStart(2, "0")}
                </div>
            </div>

            <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                <Button className={`${isRunning ? 'bg-yellow-500 hover:bg-yellow-500/80' : 'bg-green-500 hover:bg-green-500/80'} hover:shadow-2xl font-semibold text-lg text-white`} onClick={() => startStop()}>
                    {isRunning ? 'Pause' : 'Start'}
                </Button>
                <Button className="bg-[#e74c3c] hover:bg-[#e74c3c]/80 hover:shadow-2xl font-semibold text-lg text-white" onClick={() => reset()}>
                    Reset
                </Button>

                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button className="bg-gray-600  hover:shadow-2xl font-semibold text-lg text-white hover:cursor-default" onClick={() => changeMode("timer")}>
                                <Timer className="mr-2" /> Stopwatch
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <div className='bg-white'>
                                <p className='font-medium'>Focus Mode: Stopwatch</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default Stopwatch