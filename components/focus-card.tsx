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
import { fetchAllBackgrounds } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/database.types";
import toast from "react-hot-toast";

interface FocusCardProps {
    user: User
}

const FocusCard = ({ user }: FocusCardProps) => {
    const [backgrounds, setBackgrounds] = useState<string[]>([])
    const [audio, setAudio] = useState('')

    const [affirmationCategory, setAffirmationCategory] = useState('Allah')
    const [affirmationOptions, setAffirmationOptions] = useState<AffirmationOption[]>([])

    const [backgroundDialog, setBackgroundDialog] = useState(false)

    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = useSupabase()

    const currentMode = searchParams.get('mode') || 'timer'
    const [mode, setMode] = useState<'timer' | 'stopwatch'>(currentMode as 'timer' | 'stopwatch')

    const toggleMode = () => {
        const newMode = mode === 'timer' ? 'stopwatch' : 'timer';
        setMode(newMode);
        router.push(`?mode=${newMode}`, undefined)
    }

    // --- Set mode based on url-query
    useEffect(() => {
        if (currentMode !== mode) {
            setMode(currentMode as 'timer' | 'stopwatch');
        }
    }, [currentMode])

    // --- Set affirmations
    useEffect(() => {
        const getAffirmations = async (category: string) => {
            const { data: affirmations, error } = await supabase
                .from("affirmations")
                .select()
                .eq('category', category)

            if (error) {
                toast.error(error.message)
                console.error('Error retrieving affirmations:', error)
                return []
            }

            return affirmations
        }

        const fetchAffirmationOptions = async () => {
            const affirmationOptions = [
                { label: 'Allah', affirmations: await getAffirmations('Allah') },
                { label: 'Certainty', affirmations: await getAffirmations('Certainty') },
                { label: 'Struggle', affirmations: await getAffirmations('Struggle') },
                { label: 'Wisdom', affirmations: await getAffirmations('Wisdom') },
                { label: 'Punishment', affirmations: await getAffirmations('Punishment') },
                { label: 'Reward', affirmations: await getAffirmations('Reward') }
            ]

            setAffirmationOptions(affirmationOptions)
        }

        fetchAffirmationOptions()
    }, [])

    const { data: allBackgrounds = [], isLoading, error } = useQuery<Tables<'backgrounds'>[]>({
        queryKey: ['backgrounds'],
        queryFn: () => fetchAllBackgrounds(supabase),
        // staleTime: 1000 * 60 * 5, // 5 minuten
    })

    return (
        <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
            <div className="flex h-[calc(100vh-250px)]">
                <section className="flex relative h-full flex-1 flex-col p-8 max-md:pb-14 sm:px-14 overflow-hidden lg:w-[calc(100vw-300px)]">
                    <div className="flex justify-end items-center">
                        <div className="flex gap-3">
                            <AffirmationDropdown category={affirmationCategory} setCategory={setAffirmationCategory} />
                            <AudioDropdown audio={audio} setAudio={setAudio} />

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

                    {mode == 'timer' && <Timer audio={audio} backgrounds={backgrounds} affirmations={affirmationOptions.filter(aff => aff.label == affirmationCategory).flatMap(aff => aff.affirmations)} supabase={supabase} user={user} />}
                    {mode == 'stopwatch' && <Stopwatch audio={audio} backgrounds={backgrounds} affirmations={affirmationOptions.filter(aff => aff.label == affirmationCategory).flatMap(aff => aff.affirmations)} supabase={supabase} user={user} />}

                    <SetBackgroundDialog
                        isOpen={backgroundDialog}
                        setIsOpen={setBackgroundDialog}
                        backgrounds={backgrounds}
                        setBackgrounds={setBackgrounds}
                        allBackgrounds={allBackgrounds}
                        isLoading={isLoading}
                        error={error}
                    />
                </section>
            </div>
        </Card>
    )
}

export default FocusCard