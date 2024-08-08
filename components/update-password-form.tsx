'use client'

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdatePasswordSchema } from "@/schemas";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { SubmitButton } from "./submit-button";
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { updatePassword } from "@/actions/update-password";
import { useRouter } from "next/navigation";

const UpdatePasswordForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
        resolver: zodResolver(UpdatePasswordSchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        }
    })

    const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            updatePassword(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)

                router.push('/dashboard')
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
                        <div className="grid gap-4 mb-6">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="password"
                                label="New Password"
                                placeholder="********"
                                restProps={
                                    {
                                        type: showPassword ? 'text' : 'password',
                                        autoComplete: "new-password"
                                    }
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <VscEyeClosed className="h-5 w-5 text-[#303030]" />
                                    ) : (
                                        <VscEye className="h-5 w-5 text-[#303030]" />
                                    )}
                                </button>
                            </CustomFormField>

                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="passwordConfirm"
                                label="Confirm New Password"
                                placeholder="********"
                                restProps={
                                    { type: showConfirmPassword ? 'text' : 'password' }
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showConfirmPassword ? (
                                        <VscEyeClosed className="h-5 w-5 text-[#303030]" />
                                    ) : (
                                        <VscEye className="h-5 w-5 text-[#303030]" />
                                    )}
                                </button>
                            </CustomFormField>
                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <SubmitButton pendingText="Sending email...">
                            Update Password
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default UpdatePasswordForm