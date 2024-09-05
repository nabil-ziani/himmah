'use client'

import { useInterval } from "@mantine/hooks";
import { useState, useEffect } from "react";

import { CircleMinus, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const Timer = () => {
    const [defaultSeconds, setDefaultSeconds] = useState(1500);
    const [seconds, setSeconds] = useState(defaultSeconds);

    let extraSeconds: string | number = seconds % 60;
    let minutes: string | number = Math.floor(seconds / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    const interval = useInterval(() => {
        setSeconds((s) => s - 1);
    }, 1000);

    useEffect(() => {
        if (Number(minutes) <= 0 && seconds <= 0) {
            interval.stop();
            setSeconds(defaultSeconds);
            return;
        }
    }, [interval, seconds, minutes, defaultSeconds]);

    useEffect(() => {
        return interval.stop;
    }, []);

    const handlePlusClick = () => {
        setSeconds((s) => s + 300);
        setDefaultSeconds((s) => s + 300);
    };

    const handleMinusClick = () => {
        if (seconds <= 300) {
            setSeconds(0);
            return;
        }
        setSeconds((s) => s - 300);
        setDefaultSeconds((s) => s - 300);
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
                    <Button size={"lg"} className="bg-[#2ecc71] hover:bg-[#2ecc71]/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={() => interval.start()}>
                        Start
                    </Button>
                    <Button size={"lg"} className="bg-[#e74c3c] hover:bg-[#e74c3c]/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={() => {
                        interval.stop();
                        setSeconds(defaultSeconds);
                    }}>
                        Give up
                    </Button>

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
        </>
    )
}

export default Timer