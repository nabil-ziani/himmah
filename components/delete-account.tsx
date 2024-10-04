'use client'

import { Loader, UserRoundX } from "lucide-react"
import { Button } from "./ui/button"
import { FormSuccess } from "./form-success"
import { FormError } from "./form-error"
import { Form } from "./ui/form"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { deleteAccount } from "@/actions/delete-account"
import toast from "react-hot-toast"

const DeleteAccount = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const form = useForm()

    const onSubmit = () => {
        setError('')
        setSuccess('')

        startTransition(() => {
            deleteAccount().then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                if (data.success) {
                    toast.success(data.success)
                }

                router.replace('/')
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="sm:col-span-3">
                    <Button variant="destructive">
                        {isPending ? <Loader className="mr-2 h-6 w-6 animate-spin" />
                            : (
                                <>
                                    <UserRoundX className="mr-3 h-5 w-5" />
                                    <span>Delete Account</span>
                                </>
                            )
                        }
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default DeleteAccount