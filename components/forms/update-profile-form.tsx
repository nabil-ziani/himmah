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
import { SubmitButton } from "../submit-button";
import { updatePassword } from "@/actions/update-password";
import { useRouter } from "next/navigation";
import { SexOptions } from "@/constants";
import { SelectItem } from "../ui/select";
import { Button } from "../ui/button";

const UpdateProfileForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

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

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="mb-12 space-y-4">
                    <h1 className="text-3xl md:text-3xl font-bold">Profile Details</h1>
                    <p>Update your profile</p>
                </section>

                <div className="grid gap-x-10 gap-y-4 grid-cols-1 sm:grid-cols-6">
                    {/* --- NAME & PHONE ---*/}
                    <div className="sm:col-span-3">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Adnane Ibn Muhammad"
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <CustomFormField
                            fieldType={FormFieldType.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="Phone number"
                            placeholder="(+32) 000 00 00 00"
                        />
                    </div>

                    {/* --- BIO ---*/}
                    {/* <div className="sm:col-span-6">
                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="bio"
                            label="Bio"
                            placeholder="Let everyone know who you are!"
                        />
                    </div> */}

                    {/* --- EMAIL & PASSWORD ---*/}
                    <div className="sm:col-span-3">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="sm:col-span-3">
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
                    </div>

                    {/* --- SEX & BIRTHDATE ---*/}
                    <div className="sm:col-span-3">
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

                    <div className="sm:col-span-3">
                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="birthDate"
                            label="Date of birth"
                            placeholder="dd-MM-YYYY"
                            dateFormat="dd-MM-YYYY"
                        />
                    </div>

                </div>

                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="sm:col-span-3">
                    <Button variant="gradient" className="mt-6">
                        Update Profile
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default UpdateProfileForm