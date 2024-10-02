'use client'

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FeedbackSchema } from "@/schemas";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { sendFeedback } from "@/actions/send-feedback";
import { Textarea } from "../ui/textarea";

const FeedbackForm = () => {
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
        console.log('submitted')

        startTransition(() => {
            sendFeedback(values).then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                toast.success('Feedback has been sent!')
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-[40vw] w-[80vw]">
                {/* --- Feedback ---*/}
                <FormField
                    control={form.control}
                    name='feedback'
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder='Send us a message'
                                    className="h-64 p-3 focus-visible:ring-[#FF5C5C] focus-visible:ring-offset-0"
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
                        Send Feedback
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FeedbackForm