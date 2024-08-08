'use client'

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ResetSchema } from "@/schemas";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useRouter } from 'next/navigation'
import { SubmitButton } from "./submit-button";
import { reset } from "@/actions/reset";

const ForgotPasswordForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            reset(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    return (
        <div className="my-6">
            <Form {...form}>
                <form className="flex-1 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <section className="mb-12 space-y-4">
                        <h1 className="text-3xl md:text-3xl font-bold">Forgot Password?</h1>
                        <p>Fill in your email to reset your password.</p>
                    </section>

                    <div className="grid gap-2">
                        <div className="grid gap-4">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="name@example.com"
                            />
                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <SubmitButton pendingText="Sending email...">
                            Send reset email
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ForgotPasswordForm