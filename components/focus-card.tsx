'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "./ui/card"
import { Button } from "./ui/button"

import Stopwatch from "./stopwatch"
import Timer from "./timer"
import SetBackgroundDialog from "./set-background-dialog";
import { User } from "@supabase/supabase-js";
import AudioDropdown from "./audio-dropdown";
import { TbBackground } from "react-icons/tb";
import { Clock, TimerIcon } from "lucide-react";
import AffirmationDropdown from "./affirmation-dropdown";
import { AffirmationOption } from "@/lib/types";
import { useSupabase } from "@/contexts/supabaseClient";
import { fetchAffirmations, fetchAllBackgrounds } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/database.types";
import toast from "react-hot-toast";
import { useStore } from "@/hooks/useStore";

interface FocusCardProps {
    user: User
}

const FocusCard = ({ user }: FocusCardProps) => {

    const searchParams = useSearchParams();
    const supabase = useSupabase();

    const { mode, toggleMode, selectedBackgrounds, setSelectedBackgrounds, affirmationCategory, backgroundDialog, setBackgroundDialog } = useStore()

    const { data: allBackgrounds = [], isLoading: isLoadingBackgrounds, error: errorBackgrounds } = useQuery<Tables<'backgrounds'>[]>({
        queryKey: ['backgrounds'],
        queryFn: () => fetchAllBackgrounds(supabase),
    })

    const { data: affirmations = [], isLoading: isLoadingAffirmations, error: errorAffirmations } = useQuery({
        queryKey: ['affirmations', affirmationCategory],
        queryFn: () => fetchAffirmations(supabase, affirmationCategory),
        enabled: !!affirmationCategory,
    })

    const currentMode = searchParams.get('mode') || 'timer';

    useEffect(() => {
        if (currentMode !== mode) {
            toggleMode();
        }
    }, [currentMode]);

    useEffect(() => {
        if (errorBackgrounds) toast.error(errorBackgrounds.message)
        if (errorAffirmations) toast.error(errorAffirmations.message)
    }, [errorBackgrounds, errorAffirmations])

    return (
        <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
            <div className="flex h-[calc(100vh-250px)]">
                <section className="flex relative h-full flex-1 flex-col p-8 max-md:pb-14 sm:px-14 overflow-hidden lg:w-[calc(100vw-300px)]">
                    <div className="flex justify-end items-center">
                        <div className="flex gap-3">
                            <AffirmationDropdown />
                            <AudioDropdown />

                            <Button size={"lg"} className="bg-blue-600/80  hover:bg-blue-600/90 text-white text-xl hover:cursor-pointer" onClick={() => setBackgroundDialog(true)}>
                                <TbBackground className="mr-3" />
                                Background
                            </Button>
                            <Button size={"lg"} className="bg-gray-600/80  hover:bg-gray-600/90 text-white text-xl hover:cursor-pointer" onClick={toggleMode}>
                                {mode === 'timer' ? <Clock className="mr-3" /> : <TimerIcon className="mr-3" />}
                                Mode
                            </Button>
                        </div>
                    </div>

                    {mode === 'timer' && <Timer supabase={supabase} user={user} />}
                    {mode === 'stopwatch' && <Stopwatch supabase={supabase} user={user} />}

                    <SetBackgroundDialog
                        isOpen={backgroundDialog}
                        setIsOpen={setBackgroundDialog}
                        allBackgrounds={allBackgrounds}
                        selectedBackgrounds={selectedBackgrounds}
                        setSelectedBackgrounds={setSelectedBackgrounds}
                        isLoading={isLoadingBackgrounds}
                        error={errorBackgrounds}
                    />
                </section>
            </div>
        </Card>
    )
}

export default FocusCard