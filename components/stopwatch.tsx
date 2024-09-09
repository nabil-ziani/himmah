'use client'

import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import FocusDialog from './focus-dialog';

const Stopwatch = () => {
    const [fullScreen, setFullScreen] = useState(false);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    const handleStart = () => {
        setFullScreen(true);
        setIsRunning(true)
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
                    <Button size={"lg"} className="bg-green-500 hover:bg-green-500/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={handleStart}>
                        Start
                    </Button>
                </div>
            </div>

            {/* Geef de minuten en seconden door aan de FocusDialog */}
            <FocusDialog
                isOpen={fullScreen}
                setIsOpen={setFullScreen}
                mode='stopwatch'
                time={{ minutes, seconds }}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                setTime={setTime} // Zorg ervoor dat de tijd in de dialog kan worden bijgewerkt
            />
        </>
    )
}

export default Stopwatch