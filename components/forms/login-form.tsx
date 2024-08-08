'use client'

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import Link from "next/link";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useRouter } from 'next/navigation'
import { SubmitButton } from "../submit-button";

const LoginForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }

                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)

                        router.push('/dashboard')
                    }
                })
                .catch((e) => setError(e.message))
        })
    }

    return (
        <div className="my-6">
            <Form {...form}>
                <form className="flex-1 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <section className="mb-12 space-y-4">
                        <h1 className="text-3xl md:text-3xl font-bold">Sign In</h1>
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

                            <div className='space-y-1 mb-4'>
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={form.control}
                                    name="password"
                                    label="Password"
                                    placeholder="********"
                                    restProps={
                                        { type: "password" }
                                    }
                                />
                                <p>
                                    <Link href="/auth/password/reset" className="font-light text-sm hover:underline">
                                        Forgot your password?
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <SubmitButton pendingText="Signing In...">
                            Sign In
                        </SubmitButton>
                    </div>
                </form>
            </Form>

            <p className="mt-2 font-light text-sm">
                Don't have an account yet? {" "}
                <Link href="/auth/register" className="underline font-semibold">
                    Create one here!
                </Link>
            </p>
        </div>
    )
}

export default LoginForm