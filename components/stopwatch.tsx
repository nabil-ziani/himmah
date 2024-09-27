'use client'

import { useState } from 'react';
import { Button } from "./ui/button";
import FocusDialog from './focus-dialog';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from '@/database.types';
import { Affirmation } from '@/lib/types';

interface StopwatchProps {
    audio: string
    backgrounds: string[]
    supabase: SupabaseClient<Database>
    user: User
    affirmations: Affirmation[]
}

const Stopwatch = ({ audio, backgrounds, affirmations, supabase, user }: StopwatchProps) => {
    const [fullScreen, setFullScreen] = useState(false)
    const [initialTime, setInitialTime] = useState(0)
    const [time, setTime] = useState(initialTime)
    const [isRunning, setIsRunning] = useState(false)
    const [sessionId, setSessionId] = useState<number>()
    const [start_time, setStartTime] = useState<string | null>(null)

    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    const handleStart = async () => {
        setFullScreen(true)
        setIsRunning(true)

        const { data, error } = await supabase
            .from('focus_sessions')
            .insert({
                user_id: user.id,
                type: 'stopwatch'
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
        if (!start_time) {
            console.error('Start time is null');
            return;
        }

        const end_time = new Date();
        const startTimeDate = new Date(start_time)
        const duration = Math.floor((end_time.getTime() - startTimeDate.getTime()) / 1000)

        const { error } = await supabase
            .from('focus_sessions')
            .update({
                end_time: end_time.toISOString(),
                completed: true,
                duration
            })
            .eq('id', sessionId!);

        if (error) {
            console.error(error);
        } else {
            setFullScreen(false)
            setTime(initialTime)
        }
    }

    return (
        <>
            <div className="h-full justify-center flex flex-col items-center">
                <div className="flex items-center justify-center text-[200px] text-[#323238] font-semibold dark:text-white font-nunito">
                    <div>
                        {minutes.toString().padStart(2, "0")}:
                    </div>
                    <div>
                        {seconds.toString().padStart(2, "0")}
                    </div>
                </div>

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
                audio={audio}
                backgrounds={backgrounds}
                handleSessionEnd={handleSessionEnd}
                affirmations={affirmations}
            />
        </>
    )
}

export default Stopwatch;