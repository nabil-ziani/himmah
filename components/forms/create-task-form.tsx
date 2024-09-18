'use client'

import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateTaskSchema } from "@/schemas";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { createTask } from "@/actions/create-task";

interface CreateTaskFormProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateTaskForm = ({ setIsOpen }: CreateTaskFormProps) => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof CreateTaskSchema>>({
        resolver: zodResolver(CreateTaskSchema),
        defaultValues: {
            title: '',
            description: '',
            focus_time: 15
        }
    })

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsNumber;
        console.log(value)
        if (!isNaN(value)) {
            form.setValue('focus_time', value); // Set the form value to a number
        }
    };

    const onSubmit = (values: z.infer<typeof CreateTaskSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            createTask(values).then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                toast.success('Task created!')
                setIsOpen(false)
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-x-10 gap-y-4 grid-cols-1 sm:grid-cols-6">
                    {/* --- Task Title ---*/}
                    <div className="sm:col-span-6">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="title"
                            label="Title"
                            placeholder="Task Title"
                        />
                    </div>

                    {/* --- Task Description ---*/}
                    <div className="sm:col-span-6">
                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="description"
                            label="Description"
                            placeholder="Task description"
                        />
                    </div>

                    {/* --- Estimated Focus Time ---*/}
                    <div className="sm:col-span-6">
                        <CustomFormField
                            type="number"
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="focus_time"
                            label="Estimated focus Time"
                            placeholder="Focus Time"
                            onChange={handleNumberChange}
                        />
                    </div>
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="flex justify-center">
                    <Button size={"lg"} className="mt-8 text-md w-full">
                        Create Task
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateTaskForm