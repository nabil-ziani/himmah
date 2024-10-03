'use client'

import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FeedbackSchema } from "@/schemas";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { sendFeedback } from "@/actions/send-feedback";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";

interface FeedbackFormProps {
    textAreaClassName: string
    formClassName?: string
    label?: string
    setIsOpen?: Dispatch<SetStateAction<boolean>>
}

const FeedbackForm = ({ textAreaClassName, formClassName, label, setIsOpen }: FeedbackFormProps) => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof FeedbackSchema>>({
        resolver: zodResolver(FeedbackSchema),
        defaultValues: {
            feedback: ''
        }
    })

    const onSubmit = (values: z.infer<typeof FeedbackSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            sendFeedback(values).then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                if (data.success) {
                    toast.success(data.success)
                }

                if (setIsOpen) {
                    setIsOpen(false)
                }
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={formClassName}>
                {/* --- Feedback ---*/}
                <FormField
                    control={form.control}
                    name='feedback'
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            {label && <FormLabel className="shad-input-label">{label}</FormLabel>}
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder='Send us a message'
                                    className={textAreaClassName}
                                />
                            </FormControl>
                            <FormMessage className="shad-error" />
                        </FormItem>
                    )}
                />

                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="flex justify-center">
                    <Button type="submit" size={"lg"} className="mt-8 text-md w-full text-white">
                        {isPending ? <Loader className="mr-2 h-6 w-6 animate-spin" /> : 'Send Feedback'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FeedbackForm