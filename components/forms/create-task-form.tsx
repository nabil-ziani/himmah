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
import { Task, TaskType } from "@/lib/types";
import { updateTask } from "@/actions/update-task";
import { Loader } from "lucide-react";

interface CreateTaskFormProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    mode: TaskType
    task?: Task
}

const TaskForm = ({ setIsOpen, setTasks, mode, task }: CreateTaskFormProps) => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof CreateTaskSchema>>({
        resolver: zodResolver(CreateTaskSchema),
        defaultValues: {
            title: mode.type === 'edit' && task?.title || '',
            description: mode.type === 'edit' && task?.description || '',
            focus_time: task?.focus_time || 15,
        }
    })

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsNumber;

        if (!isNaN(value)) {
            form.setValue('focus_time', value)
        }
    };

    const onSubmit = (values: z.infer<typeof CreateTaskSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            const taskPromise = mode.type === 'create'
                ? createTask(mode.status, values)
                : updateTask(task?.id!, values);

            taskPromise.then((data) => {
                if (data.error) {
                    toast.error(data.error);
                } else {
                    setTasks((prevTasks) => {
                        if (mode.type === 'create') {
                            return [...prevTasks, data.data];
                        } else {
                            return prevTasks.map((task) =>
                                task.id === data.data.id ? data.data : task
                            )
                        }
                    })
                    toast.success(mode.type === 'create' ? 'Task created!' : 'Task updated!');
                    setIsOpen(false);
                }
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
                        {isPending ? <Loader className="mr-2 h-6 w-6 animate-spin" /> : mode.type === 'create' ? 'Create Task' : 'Update Task'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default TaskForm