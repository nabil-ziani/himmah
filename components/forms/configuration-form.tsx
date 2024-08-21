'use client'

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdatePasswordSchema } from "@/schemas";

import { Form, FormControl, FormDescription } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { updatePassword } from "@/actions/update-password";
import { useRouter } from "next/navigation";
import { LanguageOptions } from "@/constants";
import { SelectItem } from "../ui/select";
import { Button } from "../ui/button";

const ConfigurationForm = () => {
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
                <section className="mt-20 mb-12 space-y-4">
                    <h1 className="text-3xl md:text-3xl font-bold">Configuration</h1>
                    <p>Personalize your portal</p>
                </section>

                <div className="grid gap-x-10 gap-y-4 grid-cols-1 sm:grid-cols-6">
                    {/* --- LANGUAGE & SUBSCRIPTION ---*/}
                    <div className="sm:col-span-3">
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="language"
                            label="Language"
                            placeholder=""
                            disabled
                            defaultValue={LanguageOptions[0]}
                        >
                            {LanguageOptions.map((option, i) => (
                                <SelectItem key={option + i} value={option}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <p>{option}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>
                        <FormDescription className="text-slate-500 mt-2">
                            We only support English for the moment.
                        </FormDescription>
                    </div>
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="sm:col-span-2">
                    <Button variant="gradient" className="mt-6">
                        Save Settings
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ConfigurationForm