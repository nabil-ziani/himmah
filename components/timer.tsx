'use client'

import { useState } from "react";
import { CircleMinus, Minus, Plus, PlusCircle } from "lucide-react";
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
    const [time, setTime] = useState(initialTime)

    const minutes = Math.floor(initialTime / 60)
    const seconds = initialTime % 60

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
        setTime(initialTime) // Reset time
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
                <div className=" flex items-center justify-center text-[200px] text-[#323238] font-nunito font-semibold max-w-[321px] dark:text-white">
                    <div>{minutes.toString().padStart(2, '0')}</div>
                    <div>:</div>
                    <div>{seconds.toString().padStart(2, '0')}</div>
                </div>
                <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="flex justify-center items-center bg-gray-600/80 font-semibold text-white h-16 rounded-lg px-3" onClick={handleMinusClick}>
                                <Minus className="h-10 w-10" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <div className='bg-white'>
                                <p className='font-medium'>Decrease 5 minutes</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>

                    <Button className="bg-green-600/80 hover:shadow-md font-semibold text-4xl text-white h-16 rounded-lg px-16" onClick={handleSessionStart}>
                        Start
                    </Button>

                    <Tooltip>
                        <TooltipTrigger>
                            <div className="flex justify-center items-center bg-gray-600/80 font-semibold text-white h-16 rounded-lg px-3" onClick={handlePlusClick}>
                                <Plus className="h-10 w-10" />
                            </div>
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
                time={{ minutes, seconds }}
                setTime={setTime}
                audio={audio}
                backgrounds={backgrounds}
                handleSessionEnd={handleSessionEnd}
            />
        </>
    )
}

export default Timer