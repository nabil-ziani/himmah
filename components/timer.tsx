'use client'

import { useState } from "react";
import { CircleMinus, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import FocusDialog from "./focus-dialog";

interface TimerProps {
    audio: string
}

const Timer = ({ audio }: TimerProps) => {
    const [fullScreen, setFullScreen] = useState(false);
    const [seconds, setSeconds] = useState(1800);

    let extraSeconds: string | number = seconds % 60;
    let minutes: string | number = Math.floor(seconds / 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    const handleStart = () => {
        setFullScreen(true);
    };

    const handlePlusClick = () => {
        setSeconds((s) => s + 300); // Add 5 minutes
    };

    const handleMinusClick = () => {
        if (seconds <= 300) {
            setSeconds(0);
            return;
        }
        setSeconds((s) => s - 300); // Subtract 5 minutes
    };

    return (
        <>
            <div className="h-full justify-center flex flex-col items-center">
                <div className="p-5">
                    <h2 className="text-5xl">Timer</h2>
                </div>
                <div className=" flex items-center justify-center text-[126px] text-[#323238] font-nunito font-semibold max-w-[321px] dark:text-white">
                    <div>{minutes}</div>
                    <div>:</div>
                    <div>{extraSeconds}</div>
                </div>
                <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                    <Tooltip>
                        <TooltipTrigger className="h-12 rounded-lg px-8 bg-gray-600/80  hover:shadow-2xl text-white hover:cursor-pointer" onClick={handlePlusClick}>
                            <PlusCircle />
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <div className='bg-white'>
                                <p className='font-medium'>Increase 5 minutes</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>

                    <Button size={"lg"} className="bg-[#2ecc71] hover:bg-[#2ecc71]/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={handleStart}>
                        Start
                    </Button>

                    <Tooltip>
                        <TooltipTrigger className="h-12 rounded-lg px-8 bg-gray-600/80  hover:shadow-2xl text-white hover:cursor-pointer" onClick={handleMinusClick}>
                            <CircleMinus />
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <div className='bg-white'>
                                <p className='font-medium'>Decrease 5 minutes</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <FocusDialog isOpen={fullScreen} setIsOpen={setFullScreen} mode='timer' totalSeconds={seconds} audio={audio} />
        </>
    );
}

export default Timer;