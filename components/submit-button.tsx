'use client'

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button } from "./ui/button";

type Props = ComponentProps<"button"> & {
    pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
    const { pending, action } = useFormStatus();

    const isPending = pending && action === props.formAction;

    return (
        <Button type='submit' className='mt-5 w-full bg-[#FF4545]' disabled={isPending}>
            {isPending ? pendingText : children}
        </Button>
    );
}
