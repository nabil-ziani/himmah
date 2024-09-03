'use client'

import { useState } from "react"
import { Card } from "./ui/card"
import { Maximize2, SlidersHorizontal } from "lucide-react"
import Stopwatch from "./stopwatch"
import Timer from "./timer"
import FocusDialog from "./focus-dialog"
import FocusSettingsDialog from "./focus-settings-dialog"

const FocusCard = () => {
    const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer')
    const [fullScreen, setFullScreen] = useState(false)
    const [settings, setSettings] = useState(false)

    return (
        <>
            <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
                <div className="flex h-[calc(100vh-250px)]">
                    <section className="flex relative h-full flex-1 flex-col p-12 max-md:pb-14 sm:px-14 overflow-hidden lg:w-[100vw]">
                        <Maximize2 className="absolute top-5 right-5 cursor-pointer" color="#303030" onClick={() => setFullScreen(true)} />
                        <SlidersHorizontal className="absolute top-5 left-5 cursor-pointer" color="#303030" onClick={() => setSettings(true)} />

                        {mode == 'timer' && <Timer changeMode={setMode} />}
                        {mode == 'stopwatch' && <Stopwatch changeMode={setMode} />}
                    </section>
                </div>
            </Card>

            <FocusSettingsDialog isOpen={settings} setIsOpen={setSettings} />
            <FocusDialog isOpen={fullScreen} setIsOpen={setFullScreen} />
        </>
    )
}

export default FocusCard