'use client'

import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddFriendSchema } from "@/schemas";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { addFriend } from "@/actions/add-friend";

interface CreateTaskFormProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const FriendsForm = ({ setIsOpen }: CreateTaskFormProps) => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof AddFriendSchema>>({
        resolver: zodResolver(AddFriendSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = (values: z.infer<typeof AddFriendSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            addFriend(values).then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                toast.success('Friend request has been sent!')
                setIsOpen(false)
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-x-10 gap-y-4 grid-cols-1 sm:grid-cols-6">
                    {/* --- Email (of friend) ---*/}
                    <div className="sm:col-span-6">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="email"
                            label="Friend's email"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="flex justify-center">
                    <Button size={"lg"} className="mt-8 text-md w-full">
                        Add Friend
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FriendsForm