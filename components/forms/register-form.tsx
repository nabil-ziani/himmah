'use client'

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import Link from "next/link";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { SubmitButton } from "../submit-button";
import { SexOptions } from "@/constants";
import { SelectItem } from "../ui/select";
import { register } from "@/actions/register";

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            sex: undefined,
            birthDate: undefined
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            register(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }

                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)
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
                        <h1 className="text-3xl md:text-3xl font-bold">Create Account</h1>
                    </section>

                    <div className="grid gap-2">
                        <div className="grid gap-4">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="John Doe"
                            />

                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="name@example.com"
                            />

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

                            {/* BirthDate & Gender */}
                            <div className="flex flex-col md:gap-5 xl:gap-10 w-full justify-between xl:flex-row mt-3 xl:mb-10">
                                <CustomFormField
                                    fieldType={FormFieldType.DATE_PICKER}
                                    control={form.control}
                                    name="birthDate"
                                    label="Date of birth"
                                    placeholder="dd-MM-YYYY"
                                    dateFormat="dd-MM-YYYY"
                                />

                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    control={form.control}
                                    name="sex"
                                    label="Sex"
                                    placeholder="Select your sex"
                                >
                                    {SexOptions.map((option, i) => (
                                        <SelectItem key={option + i} value={option}>
                                            <div className="flex cursor-pointer items-center gap-2">
                                                <p>{option}</p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </CustomFormField>
                            </div>
                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <SubmitButton pendingText="Creating Account..." isPending={isPending}>
                            Create Account
                        </SubmitButton>
                    </div>
                </form>
            </Form>

            <div className="flex justify-between items-center">
                <p className="mt-2 font-light text-sm">
                    Already have an account? {" "}
                    <Link href="/auth/login" className="underline font-semibold">
                        Login
                    </Link>
                </p>

                {/* <p className="mt-2 font-light text-sm">
                    Read and agree with {" "}
                    <Link href="/auth/register" className="underline font-semibold text-[#00A5A5]">
                        ToS
                    </Link>
                </p> */}
            </div>
        </div>
    )
}

export default RegisterForm