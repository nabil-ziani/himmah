'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from "@/components/ui/dropdown-menu"
import { CirclePlay, Image } from "lucide-react"

import Stopwatch from "./stopwatch"
import Timer from "./timer"
import { createClient } from "@/utils/supabase/client";
import SetBackgroundDialog from "./set-background-dialog";
import { User } from "@supabase/supabase-js";
import AudioDropdown from "./audio-dropdown";

type AudioFile = {
    name: string
    url: string
}

type AudioOption = {
    label: string
    files: AudioFile[]
}

interface FocusCardProps {
    user: User
}

const FocusCard = ({ user }: FocusCardProps) => {
    const [backgrounds, setBackgrounds] = useState<string[]>([])
    const [audio, setAudio] = useState('Weather')
    const [audioOptions, setAudioOptions] = useState<AudioOption[]>([]);
    const [backgroundDialog, setBackgroundDialog] = useState(false)

    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient()

    const currentMode = searchParams.get('mode') || 'timer'
    const [mode, setMode] = useState<'timer' | 'stopwatch'>(currentMode as 'timer' | 'stopwatch')

    const toggleMode = () => {
        const newMode = mode === 'timer' ? 'stopwatch' : 'timer';
        setMode(newMode);
        router.push(`?mode=${newMode}`, undefined)
    };

    // --- Set mode based on url-query
    useEffect(() => {
        if (currentMode !== mode) {
            setMode(currentMode as 'timer' | 'stopwatch');
        }
    }, [currentMode]);

    // --- set white noise (audioOptions)
    useEffect(() => {
        const getAudioFiles = async (folder: string) => {
            const { data, error } = await supabase.storage
                .from('white_noise')
                .list(folder)

            if (error) {
                console.error('Error retrieving files:', error)
                return []
            }

            const files = data.map(file => {
                return {
                    name: file.name,
                    url: supabase.storage
                        .from('white_noise')
                        .getPublicUrl(`${folder}/${file.name}`).data.publicUrl
                }
            })

            return files
        }

        const fetchAudioOptions = async () => {
            const options = [
                { label: 'Animals', files: await getAudioFiles('Animals') },
                { label: 'City', files: await getAudioFiles('City') },
                { label: 'Fire', files: await getAudioFiles('Fire') },
                { label: 'Transport', files: await getAudioFiles('Transport') },
                { label: 'Unfit', files: await getAudioFiles('Unfit') },
                { label: 'Water', files: await getAudioFiles('Water') },
                { label: 'Weather', files: await getAudioFiles('Weather') }
            ]
            setAudioOptions(options)
        }

        fetchAudioOptions()
    }, [])

    return (
        <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
            <div className="flex h-[calc(100vh-250px)]">
                <section className="flex relative h-full flex-1 flex-col p-8 max-md:pb-14 sm:px-14 overflow-hidden lg:w-[calc(100vw-300px)]">
                    <div className="flex justify-end items-center">
                        <div className="flex gap-3">
                            <AudioDropdown title="Audio" audioOptions={audioOptions} setAudio={setAudio} />

                            <Button size={"lg"} className="bg-[#6A0D91]/60  hover:bg-[#6A0D91]/70 text-white text-xl hover:cursor-pointer" onClick={() => setBackgroundDialog(true)}>
                                <Image className="mr-3" />
                                Background
                            </Button>
                            <Button size={"lg"} className="bg-gray-600/60  hover:bg-gray-600/70 text-white text-xl hover:cursor-pointer" onClick={toggleMode}>
                                Change Mode
                            </Button>
                        </div>
                    </div>

                    {mode == 'timer' && <Timer audio={audio} backgrounds={backgrounds} supabase={supabase} user={user} />}
                    {mode == 'stopwatch' && <Stopwatch audio={audio} backgrounds={backgrounds} supabase={supabase} user={user} />}

                    <SetBackgroundDialog isOpen={backgroundDialog} setIsOpen={setBackgroundDialog} backgrounds={backgrounds} setBackgrounds={setBackgrounds} />
                </section>
            </div>
        </Card>
    )
}

export default FocusCard