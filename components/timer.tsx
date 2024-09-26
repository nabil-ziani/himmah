'use client'

import { useEffect, useState } from "react";
import { CircleMinus, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import FocusDialog from "./focus-dialog";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "@/database.types";
import toast from "react-hot-toast";

interface TimerProps {
    audio: string
    backgrounds: string[]
    supabase: SupabaseClient<Database>
    user: User
}

const Timer = ({ audio, backgrounds, supabase, user }: TimerProps) => {
    const [fullScreen, setFullScreen] = useState(false)
    const [sessionId, setSessionId] = useState<number>()
    const [start_time, setStartTime] = useState<string | null>(null)
    const [initialTime, setInitialTime] = useState(1800)
    const [seconds, setSeconds] = useState(initialTime)

    let extraSeconds: string | number = seconds % 60;
    let minutes: string | number = Math.floor(seconds / 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    const handleSessionStart = async () => {
        setFullScreen(true)

        const { data, error } = await supabase
            .from('focus_sessions')
            .insert({
                user_id: user.id,
                type: 'timer'
            })
            .select()
            .single()

        if (error) {
            console.error(error)
        } else {
            setSessionId(data.id)
            setStartTime(data.start_time)
        }
    }

    const handleSessionEnd = async (completed: boolean) => {
        // Should not be possible
        if (!start_time) {
            console.error('Start time is null')
            return
        }

        const end_time = new Date();
        const startTimeDate = new Date(start_time)
        const duration = Math.floor((end_time.getTime() - startTimeDate.getTime()) / 1000)

        const { error } = await supabase
            .from('focus_sessions')
            .update({
                end_time: end_time.toISOString(),
                completed,
                duration
            })
            .eq('id', sessionId!)

        if (error) toast.error(error.message);

        setFullScreen(false)
        setSeconds(initialTime)
    }

    const handlePlusClick = () => {
        setInitialTime((t) => t + 300)
    }

    const handleMinusClick = () => {
        if (initialTime <= 300) {
            setInitialTime(0)
            return
        }
        setInitialTime((t) => t - 300)
    }

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
                        <TooltipTrigger className="h-12 rounded-lg px-8 bg-gray-600/80  hover:shadow-2xl text-white hover:cursor-pointer" onClick={handleMinusClick}>
                            <CircleMinus />
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <div className='bg-white'>
                                <p className='font-medium'>Decrease 5 minutes</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>

                    <Button size={"lg"} className="bg-[#2ecc71] hover:bg-[#2ecc71]/80 hover:shadow-2xl font-semibold text-xl text-white" onClick={handleSessionStart}>
                        Start
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
                </div>
            </div>

            <FocusDialog
                isOpen={fullScreen}
                mode='timer'
                totalSeconds={seconds}
                audio={audio}
                backgrounds={backgrounds}
                handleSessionEnd={handleSessionEnd}
            />
        </>
    )
}

export default Timer;