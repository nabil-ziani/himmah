'use client'

import { type ComponentProps } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react"

type Props = ComponentProps<"button"> & {
    pendingText?: string
    isPending?: boolean
};

export function SubmitButton({ children, pendingText, isPending = false }: Props) {
    return (
        isPending ? (
            <Button type='submit' className='mt-3 w-full bg-[#FF4545]' disabled >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {pendingText}
            </Button>
        ) :
            <Button type='submit' className='mt-3 w-full bg-[#FF4545]'>
                {children}
            </Button>
    );
}
