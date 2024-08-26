'use client'

import { AnimatePresence, motion } from "framer-motion"
import { Minimize2 } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface FocusDialogProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}


const FocusDialog = ({ isOpen, setIsOpen }: FocusDialogProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 grid place-items-center overflow-y-scroll">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-full bg-white relative grid place-items-center"
                    >
                        <Minimize2 className="absolute top-5 right-5 cursor-pointer z-100" color="#303030" onClick={() => setIsOpen(false)} />
                        FULL FOCUS SCREEN
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default FocusDialog