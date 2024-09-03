'use client'

import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, SetStateAction, useState } from "react"

interface FocusSettingsDialogProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const FocusSettingsDialog = ({ isOpen, setIsOpen }: FocusSettingsDialogProps) => {
    const [settings, setSettings] = useState({
        defaultMode: 'timer',
        defaultTime: '',
        background: '',
        audio: 'birds'
    })

    return (
        <AnimatePresence>
            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="inset-0 z-50 grid place-items-center absolute">
                    <motion.div
                        initial={{ y: 48, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 48, opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="z-100 w-[50vw] h-[50vh] bg-yellow-50 grid place-items-center"
                    >
                        TODO: Set minutes and audio and bg's
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default FocusSettingsDialog