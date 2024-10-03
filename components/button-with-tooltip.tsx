'use client'

import { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface ButtonTooltipProps {
    icon: ReactNode
    onClick: () => void
    content: string
}

const ButtonTooltip = ({ icon, onClick, content }: ButtonTooltipProps) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                <div className="flex justify-center items-center bg-gray-600/80 font-semibold text-white h-16 rounded-lg px-3" onClick={onClick}>
                    {icon}
                </div>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
                <div className='bg-white'>
                    <p className='font-medium'>{content}</p>
                </div>
            </TooltipContent>
        </Tooltip>
    )
}

export default ButtonTooltip