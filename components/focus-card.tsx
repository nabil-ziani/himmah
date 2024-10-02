'use client'

import { useEffect } from "react"
import { useSearchParams } from "next/navigation";
import { Card } from "./ui/card"
import { Button } from "./ui/button"

import { User } from "@supabase/supabase-js";
import AudioDropdown from "./audio-dropdown";
import { TbBackground } from "react-icons/tb";
import AffirmationDropdown from "./affirmation-dropdown";
import { useSupabase } from "@/contexts/supabaseClient";
import { fetchAffirmations, fetchAllBackgrounds } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/database.types";
import toast from "react-hot-toast";
import { useStore } from "@/hooks/useStore";
import FocusSettingsModal from "./focus-settings-modal";
import { RiSettings4Fill } from "react-icons/ri";
import { TbClockHour4Filled } from "react-icons/tb";
import { RiTimer2Fill } from "react-icons/ri";
import dynamic from "next/dynamic";
import { Loader, Loader2 } from "lucide-react";

interface FocusCardProps {
    user: User
}

const FocusCard = ({ user }: FocusCardProps) => {

    const searchParams = useSearchParams();
    const supabase = useSupabase();

    const Timer = dynamic(() => import('./timer'));
    const Stopwatch = dynamic(() => import('./stopwatch'));
    const SetBackgroundDialog = dynamic(() => import('./set-background-dialog'));

    const { mode, toggleMode, affirmationCategory, setAffirmations, setBackgroundModalOpen, setFocusSettingsModalOpen } = useStore()

    const { data: allBackgrounds = [], isLoading: isLoadingBackgrounds, error: errorBackgrounds } = useQuery<Tables<'backgrounds'>[]>({
        queryKey: ['backgrounds'],
        queryFn: () => fetchAllBackgrounds(supabase),
    })

    const { data: affirmations = [], isLoading: isLoadingAffirmations, error: errorAffirmations } = useQuery({
        queryKey: ['affirmations', affirmationCategory],
        queryFn: () => fetchAffirmations(supabase, affirmationCategory),
        enabled: !!affirmationCategory,
    })

    useEffect(() => {
        if (!isLoadingAffirmations && !errorAffirmations && affirmations.length > 0) {
            setAffirmations(affirmations)
        }
    }, [affirmations, isLoadingAffirmations, errorAffirmations])

    const currentMode = searchParams.get('mode') || 'timer'

    useEffect(() => {
        if (currentMode !== mode) {
            toggleMode()
        }
    }, [currentMode])

    useEffect(() => {
        if (errorBackgrounds) toast.error(errorBackgrounds.message)
        if (errorAffirmations) toast.error(errorAffirmations.message)
    }, [errorBackgrounds, errorAffirmations])

    return (
        <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
            <div className="flex h-[calc(100vh-250px)]">
                <section className="flex relative h-full flex-1 flex-col p-8 max-md:pb-14 sm:px-14 overflow-hidden lg:w-[calc(100vw-400px)]">
                    <div className="flex justify-between items-center">
                        <div className="text-white bg-gray-500/80  hover:bg-gray-500/90 text-xl hover:cursor-pointer rounded-full" onClick={() => setFocusSettingsModalOpen(true)}>
                            <RiSettings4Fill className="m-2 h-7 w-7" />
                        </div>
                        <div className="flex gap-3">
                            <AffirmationDropdown />
                            <AudioDropdown />

                            <Button size={"lg"} className="bg-blue-600/80  hover:bg-blue-600/90 text-white text-xl hover:cursor-pointer" onClick={() => setBackgroundModalOpen(true)}>
                                <TbBackground className="mr-3" />
                                Background
                            </Button>
                            <Button size={"lg"} className="bg-gray-600/80  hover:bg-gray-600/90 text-white text-xl hover:cursor-pointer" onClick={toggleMode}>
                                {mode === 'timer' ? <TbClockHour4Filled className="mr-3" /> : <RiTimer2Fill className="mr-3" />}
                                Mode
                            </Button>
                        </div>
                    </div>

                    {mode === 'timer' && <Timer supabase={supabase} user={user} />}
                    {mode === 'stopwatch' && <Stopwatch supabase={supabase} user={user} />}

                    <SetBackgroundDialog allBackgrounds={allBackgrounds} isLoading={isLoadingBackgrounds} error={errorBackgrounds} />

                    <FocusSettingsModal />
                </section>
            </div >
        </Card >
    )
}

export default FocusCard