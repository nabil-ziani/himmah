'use client'

import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import FocusDialog from './focus-dialog';

const Stopwatch = () => {
    const [fullScreen, setFullScreen] = useState(false);
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

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    const handleStart = () => {
        setFullScreen(true);
    };

    // Method to start and stop timer
    const startStop = () => {
        setFullScreen(true)
        setIsRunning(!isRunning);
    };

    // Method to reset timer back to 0
    const reset = () => {
        setTime(0);
    };

    return (
        <>
            <div className="h-full justify-center flex flex-col items-center">
                <div className="p-5">
                    <h2 className="text-5xl">Stopwatch</h2>
                </div>
                <div className="flex items-center justify-center text-[126px] text-[#323238] font-semibold dark:text-white font-nunito">
                    <div>
                        {minutes.toString().padStart(2, "0")}:
                    </div>
                    <div>
                        {seconds.toString().padStart(2, "0")}
                    </div>
                </div>

                <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                    <Button size={"lg"} className={`${isRunning ? 'bg-yellow-500 hover:bg-yellow-500/80' : 'bg-green-500 hover:bg-green-500/80'} hover:shadow-2xl font-semibold text-xl text-white`} onClick={handleStart}>
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                    <Button size={"lg"} className="bg-[#e74c3c] hover:bg-[#e74c3c]/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={() => reset()}>
                        Reset
                    </Button>
                </div>
            </div>

            <FocusDialog isOpen={fullScreen} setIsOpen={setFullScreen} mode='stopwatch' totalSeconds={seconds} />
        </>
    )
}

export default Stopwatch