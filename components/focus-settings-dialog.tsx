'use client'

import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react"

interface FocusSettingsDialogProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const FocusSettingsDialog = ({ isOpen, setIsOpen }: FocusSettingsDialogProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="inset-0 z-50 grid place-items-center absolute">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="z-100 w-[50vw] h-[50vh] bg-yellow-50 grid place-items-center"
                    >
                        TODO: Set minutes
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default FocusSettingsDialog