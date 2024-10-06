'use client'

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import FocusDialog from "./focus-dialog";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "@/database.types";
import toast from "react-hot-toast";
import { useFocusSession } from "@/hooks/useFocusSession";
import ButtonTooltip from "./button-with-tooltip";

interface TimerProps {
    supabase: SupabaseClient<Database>
    user: User
}

const Timer = ({ supabase, user }: TimerProps) => {
    const [fullScreen, setFullScreen] = useState(false)
    const [initialTime, setInitialTime] = useState(1800)
    const [time, setTime] = useState(initialTime)

    const minutes = Math.floor(initialTime / 60)
    const seconds = initialTime % 60

    const { startSession, endSession, startTime } = useFocusSession({
        supabase,
        userId: user.id,
        type: 'timer'
    })

    const handleSessionStart = async () => {
        setFullScreen(true)

        try {
            await startSession();
        } catch (error: any) {
            console.error(error);
            toast.error("Can't start session. Try again later.");
        }
    }

    const handleSessionEnd = async (completed: boolean) => {
        // Should not be possible
        if (!startTime) {
            toast.error('Start time is null')
            return
        }

        const end_time = new Date();
        const startTimeDate = new Date(startTime)
        const duration = Math.floor((end_time.getTime() - startTimeDate.getTime()) / 1000)

        try {
            await endSession(completed, duration)

            setFullScreen(false)
            setTime(initialTime) // Reset time
        } catch (error: any) {
            toast.error("Can't end the session, try again later.")
            console.error(error)
        }
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
        <div className="flex flex-col flex-1 justify-center items-center">
            <span className="text-[200px] text-[#323238] font-nunito font-semibold">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
            <div className="flex items-center justify-around text-[#323238] gap-x-5">
                <ButtonTooltip icon={<Minus className="h-10 w-10" />} onClick={handleMinusClick} content='Decrease 5 minutes' />

                <Button className="bg-green-600/80 hover:shadow-md font-semibold text-4xl text-white h-16 rounded-lg px-16" onClick={handleSessionStart}>
                    Start
                </Button>

                <ButtonTooltip icon={<Plus className="h-10 w-10" />} onClick={handlePlusClick} content='Increase 5 minutes' />
            </div>

            <FocusDialog isOpen={fullScreen} mode='timer' time={{ minutes, seconds }} setTime={setTime} handleSessionEnd={handleSessionEnd} />
        </div>
    )
}

export default Timer