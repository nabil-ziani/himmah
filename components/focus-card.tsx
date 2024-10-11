'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation";
import { Card } from "./ui/card"
import { Button } from "./ui/button"

import { User } from "@supabase/supabase-js";
import AudioDropdown from "./audio-dropdown";
import { TbBackground } from "react-icons/tb";
import AffirmationDropdown from "./affirmation-dropdown";
import { useSupabase } from "@/contexts/supabaseClient";
import { Tables } from "@/database.types";
import toast from "react-hot-toast";
import { useStore } from "@/hooks/useStore";
import FocusSettingsModal from "./focus-settings-modal";
import { RiSettings4Fill } from "react-icons/ri";
import { TbClockHour4Filled } from "react-icons/tb";
import { RiTimer2Fill } from "react-icons/ri";
import dynamic from "next/dynamic";
import Timer from "./timer";
import Stopwatch from "./stopwatch";

interface FocusCardProps {
    user: User
    backgrounds: Tables<'backgrounds'>[]
    affirmations: Tables<'affirmations'>[]
}

const FocusCard = ({ user, backgrounds, affirmations }: FocusCardProps) => {
    const [backgroundModalOpen, setBackgroundModalOpen] = useState(false)

    const searchParams = useSearchParams()
    const supabase = useSupabase()

    const SetBackgroundDialog = dynamic(() => import('./set-background-dialog'))

    const { mode, toggleMode, setFocusSettingsModalOpen, setAffirmations } = useStore()

    const currentMode = searchParams.get('mode') || 'timer'

    useEffect(() => {
        if (currentMode !== mode) {
            toggleMode()
        }
    }, [currentMode])

    useEffect(() => {
        if (backgrounds.length === 0 || affirmations.length === 0) {
            toast.error("Could not load backgrounds or affirmations.");
        } else {
            setAffirmations(affirmations)
        }
    }, [backgrounds, affirmations]);

    return (
        <Card className='flex flex-grow w-full max-w-[1800px] bg-white shadow-xl rounded-2xl overflow-hidden'>
            <section className="flex flex-col flex-1 overflow-y-auto w-full">
                <div className="flex justify-between items-center p-8">
                    <div className="text-white bg-gray-500/80  hover:bg-gray-500/90 text-xl hover:cursor-pointer rounded-full" onClick={() => setFocusSettingsModalOpen(true)}>
                        <RiSettings4Fill className="m-2 h-7 w-7" />
                    </div>
                    <div className="flex gap-3">
                        <AffirmationDropdown />
                        <AudioDropdown />

                        <Button size={"lg"} className="bg-blue-600/80  hover:bg-blue-600/90 text-white text-xl hover:cursor-pointer" onClick={() => setBackgroundModalOpen(true)}>
                            <TbBackground />
                            <span className="hidden lg:block ml-3">Background</span>
                        </Button>
                        <Button size={"lg"} className="bg-gray-600/80  hover:bg-gray-600/90 text-white text-xl hover:cursor-pointer" onClick={toggleMode}>
                            {mode === 'timer' ? <TbClockHour4Filled /> : <RiTimer2Fill />}
                            <span className="hidden lg:block ml-3">Mode</span>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-1">
                    {mode === 'timer' && <Timer supabase={supabase} user={user} />}
                    {mode === 'stopwatch' && <Stopwatch supabase={supabase} user={user} />}
                </div>

                <SetBackgroundDialog allBackgrounds={backgrounds} isOpen={backgroundModalOpen} setIsOpen={setBackgroundModalOpen} />
                <FocusSettingsModal />
            </section>
        </Card >
    )
}

export default FocusCard