'use client'

import { Card } from "./ui/card"
import Stopwatch from "./stopwatch"
import Timer from "./timer"
import { useState } from "react"
import { Maximize2 } from "lucide-react"
import FocusDialog from "./focus-dialog"

const FocusCard = () => {
    const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer')
    const [fullScreen, setFullScreen] = useState(false)

    return (
        <>
            <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
                <div className="flex h-[calc(100vh-250px)]">
                    <section className="flex relative h-full flex-1 flex-col p-12 max-md:pb-14 sm:px-14 overflow-hidden lg:w-[100vw]">
                        <Maximize2 className="absolute top-5 right-5 cursor-pointer" color="#303030" onClick={() => setFullScreen(true)} />

                        {mode == 'timer' && <Timer changeMode={setMode} />}
                        {mode == 'stopwatch' && <Stopwatch changeMode={setMode} />}
                    </section>
                </div>
            </Card>

            <FocusDialog isOpen={fullScreen} setIsOpen={setFullScreen} />
        </>
    )
}

export default FocusCard