'use client'

import { useState } from "react"
import { Card } from "./ui/card"
import { SlidersHorizontal } from "lucide-react"
import Stopwatch from "./stopwatch"
import Timer from "./timer"
import FocusSettingsDialog from "./focus-settings-dialog"
import { Button } from "./ui/button"

const FocusCard = () => {
    const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer')
    const [settings, setSettings] = useState(false)

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'timer' ? 'stopwatch' : 'timer'))
    }

    return (
        <>
            <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
                <div className="flex h-[calc(100vh-250px)]">
                    <section className="flex relative h-full flex-1 flex-col p-8 max-md:pb-14 sm:px-14 overflow-hidden lg:w-[100vw]">
                        <div className="flex justify-between items-center cursor-pointer">
                            <div>
                                <SlidersHorizontal color="#303030" onClick={() => setSettings(true)} />
                            </div>
                            <div>
                                <Button size={"lg"} className="bg-gray-600/60  hover:bg-gray-600/70 text-white text-xl hover:cursor-pointer" onClick={toggleMode}>
                                    Change Mode
                                </Button>
                            </div>
                        </div>

                        {mode == 'timer' && <Timer />}
                        {mode == 'stopwatch' && <Stopwatch />}
                    </section>
                </div>
            </Card>

            <FocusSettingsDialog isOpen={settings} setIsOpen={setSettings} />
        </>
    )
}

export default FocusCard