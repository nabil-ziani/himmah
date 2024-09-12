'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { CirclePlay, Image } from "lucide-react"

import Stopwatch from "./stopwatch"
import Timer from "./timer"
// import FocusSettingsDialog from "./focus-settings-dialog"

const audioOptions = [
    {
        label: 'Forest Sound',
        value: 'forest'
    },
    {
        label: 'Rain Sound',
        value: 'rain'
    },
    {
        label: 'Coffee Sound',
        value: 'coffee'
    },
    {
        label: 'Fireplace Sound',
        value: 'fireplace'
    }
]

const FocusCard = () => {
    // const [settings, setSettings] = useState(false)
    const [audio, setAudio] = useState('forest')

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentMode = searchParams.get('mode') || 'timer';
    const [mode, setMode] = useState<'timer' | 'stopwatch'>(currentMode as 'timer' | 'stopwatch');

    const toggleMode = () => {
        const newMode = mode === 'timer' ? 'stopwatch' : 'timer';
        setMode(newMode);
        router.push(`?mode=${newMode}`, undefined)
    };

    useEffect(() => {
        if (currentMode !== mode) {
            setMode(currentMode as 'timer' | 'stopwatch');
        }
    }, [currentMode]);

    return (
        <>
            <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
                <div className="flex h-[calc(100vh-250px)]">
                    <section className="flex relative h-full flex-1 flex-col p-8 max-md:pb-14 sm:px-14 overflow-hidden lg:w-[100vw]">
                        <div className="flex justify-end items-center cursor-pointer">
                            {/* <div>
                                <SlidersHorizontal color="#303030" onClick={() => setSettings(true)} />
                            </div> */}
                            <div className="flex gap-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size={"lg"} className="bg-[#1E90FF]/60  hover:bg-[#1E90FF]/70 text-white text-xl hover:cursor-pointer">
                                            <CirclePlay className="mr-3" />
                                            Audio
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel></DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value={audio} onValueChange={setAudio}>
                                            {audioOptions.map((audio) => <DropdownMenuRadioItem value={audio.value}>{audio.label}</DropdownMenuRadioItem>)}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button size={"lg"} className="bg-[#6A0D91]/60  hover:bg-[#6A0D91]/70 text-white text-xl hover:cursor-pointer">
                                    <Image className="mr-3" />
                                    Background
                                </Button>
                                <Button size={"lg"} className="bg-gray-600/60  hover:bg-gray-600/70 text-white text-xl hover:cursor-pointer" onClick={toggleMode}>
                                    Change Mode
                                </Button>
                            </div>
                        </div>

                        {mode == 'timer' && <Timer audio={audio} />}
                        {mode == 'stopwatch' && <Stopwatch audio={audio} />}
                    </section>
                </div>
            </Card>

            {/* <FocusSettingsDialog isOpen={settings} setIsOpen={setSettings} /> */}
        </>
    )
}

export default FocusCard