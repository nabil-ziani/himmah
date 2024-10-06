'use client'

import { useState } from 'react';
import { Button } from "./ui/button";
import FocusDialog from './focus-dialog';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from '@/database.types';
import toast from 'react-hot-toast';
import { useFocusSession } from '@/hooks/useFocusSession';

interface StopwatchProps {
    supabase: SupabaseClient<Database>
    user: User
}

const Stopwatch = ({ supabase, user }: StopwatchProps) => {
    const [fullScreen, setFullScreen] = useState(false)
    const [initialTime, setInitialTime] = useState(0)
    const [time, setTime] = useState(initialTime)
    const [isRunning, setIsRunning] = useState(false)

    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100)

    const { startSession, endSession, startTime } = useFocusSession({
        supabase,
        userId: user.id,
        type: 'stopwatch'
    })

    const handleStart = async () => {
        setFullScreen(true)
        setIsRunning(true)

        try {
            await startSession();
        } catch (error: any) {
            toast.error("Can't start session, try again later.");
            console.error(error);
        }
    }

    const handleSessionEnd = async () => {
        if (!startTime) {
            toast.error('Start time is null');
            return
        }

        const end_time = new Date();
        const startTimeDate = new Date(startTime)

        try {
            await endSession(true)

            setFullScreen(false)
            setTime(initialTime) // Reset time
        } catch (error: any) {
            toast.error("Can't end the session, try again later.")
            console.error(error)
        }
    }

    return (
        <>
            <div className="flex flex-col flex-1 justify-center items-center">
                <span className="text-[200px] text-[#323238] font-nunito font-semibold">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </span>

                <div className="flex items-center justify-around mx-[4px] text-[#323238] gap-x-5">
                    <Button className="bg-green-600/80 hover:shadow-md font-semibold text-4xl text-white h-16 rounded-lg px-16" onClick={handleStart}>
                        Start
                    </Button>
                </div>
            </div>

            <FocusDialog
                isOpen={fullScreen}
                mode='stopwatch'
                time={{ minutes, seconds }}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                setTime={setTime}
                handleSessionEnd={handleSessionEnd}
            />
        </>
    )
}

export default Stopwatch;