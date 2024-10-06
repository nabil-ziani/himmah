'use client'

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateProfileSchema } from "@/schemas";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { updateProfile } from "@/actions/update-profile";
import { useRouter } from "next/navigation";
import { SexOptions } from "@/constants";
import { SelectItem } from "../ui/select";
import { Button } from "../ui/button";
import { User } from "@supabase/supabase-js";
import { adjustForTimezone } from "@/lib/utils";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

interface UpdateProfileFormProps {
    user: User
}

const UpdateProfileForm = ({ user }: UpdateProfileFormProps) => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const form = useForm<z.infer<typeof UpdateProfileSchema>>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            name: user.user_metadata.name,
            email: user.email,
            birthdate: user.user_metadata.birthdate && adjustForTimezone(new Date(user.user_metadata.birthdate)) || undefined,
            sex: user.user_metadata.sex || undefined
        }
    })

    const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            updateProfile(values).then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                toast.success('Profile updated!')

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
                    <div className="sm:col-span-6">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Your Name"
                        />
                    </div>

                    {/* <div className="sm:col-span-3">
                        <CustomFormField
                            fieldType={FormFieldType.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="Phone number"
                            placeholder="(+32) 000 00 00 00"
                        />
                    </div> */}

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
                    {/* <div className="sm:col-span-6">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="name@example.com"
                        />
                    </div> */}

                    {/* <div className="sm:col-span-3">
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
                    </div> */}

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
                            name="birthdate"
                            label="Date of birth"
                            placeholder="dd-MM-YYYY"
                            dateFormat="dd-MM-YYYY"
                        />
                    </div>
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="sm:col-span-3">
                    <Button className="mt-6 text-white">
                        {isPending ? <Loader className="mr-2 h-6 w-6 animate-spin" /> : 'Update profile'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default UpdateProfileForm