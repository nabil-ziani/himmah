'use client'

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";
import Link from "next/link";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useRouter } from 'next/navigation'
import { SubmitButton } from "./submit-button";
import Separator from "./seperator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { SexOptions } from "@/constants";
import { Label } from "./ui/label";

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            sex: "Male",
            birthDate: new Date(Date.now())
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

                            {/* <Separator text="OPTIONAL" color="white mt-10" /> */}

                            {/* BirthDate & Gender */}
                            <div className="flex flex-col gap-10 xl:flex-row mt-3">
                                <CustomFormField
                                    fieldType={FormFieldType.SKELETON}
                                    control={form.control}
                                    name="gender"
                                    label="Gender"
                                    renderSkeleton={(field) => (
                                        <FormControl>
                                            <RadioGroup
                                                className="flex h-11 gap-6 xl:justify-between"
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                {SexOptions.map((option, i) => (
                                                    <div key={option + i} className="radio-group">
                                                        <RadioGroupItem value={option} id={option} />
                                                        <Label htmlFor={option} className="cursor-pointer">
                                                            {option}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                />

                                <CustomFormField
                                    fieldType={FormFieldType.DATE_PICKER}
                                    control={form.control}
                                    name="birthDate"
                                    label="Date of birth"
                                    placeholder="mm-dd-YYYY"
                                />
                            </div>

                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <SubmitButton pendingText="Creating Account...">
                            Create Account
                        </SubmitButton>
                    </div>
                </form>
            </Form>

            <div className="flex justify-between items-center">
                <p className="mt-2 font-light text-sm">
                    Already have an account? {" "}
                    <Link href="/auth/register" className="underline font-semibold">
                        Login
                    </Link>
                </p>

                <p className="mt-2 font-light text-sm">
                    Read and agree with {" "}
                    <Link href="/auth/register" className="underline font-semibold text-[#00A5A5]">
                        ToS
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm