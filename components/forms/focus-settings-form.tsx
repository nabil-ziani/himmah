'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateFocusSettingsSchema } from "@/schemas";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { Button } from "../ui/button";
import { useStore } from "@/hooks/useStore";
import toast from "react-hot-toast";

const FocusSettingsForm = () => {

    const { affirmationsInterval, setAffirmationsInterval, backgroundsInterval, setBackgroundsInterval, setFocusSettingsModalOpen } = useStore()

    const form = useForm<z.infer<typeof UpdateFocusSettingsSchema>>({
        resolver: zodResolver(UpdateFocusSettingsSchema),
        defaultValues: {
            affirmations_interval: affirmationsInterval,
            backgrounds_interval: backgroundsInterval
        }
    })

    const onSubmit = (values: z.infer<typeof UpdateFocusSettingsSchema>) => {
        setAffirmationsInterval(values.affirmations_interval)
        setBackgroundsInterval(values.backgrounds_interval)

        toast.success(`Intervals updated!`)
        setFocusSettingsModalOpen(false)
    }

    const handleNumberChange = (name: 'affirmations_interval' | 'backgrounds_interval') =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber

            if (!isNaN(value)) {
                form.setValue(name, value);
            }
        };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-x-10 gap-y-4 grid-cols-1 sm:grid-cols-6">
                    {/* --- Affirmations Interval ---*/}
                    <div className="sm:col-span-6">
                        <CustomFormField
                            type="number"
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="affirmations_interval"
                            label="Affirmations Interval (minutes)"
                            placeholder="Focus Time"
                            onChange={handleNumberChange('affirmations_interval')}
                        />
                    </div>

                    {/* --- Backgrounds Interval ---*/}
                    <div className="sm:col-span-6">
                        <CustomFormField
                            type="number"
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="backgrounds_interval"
                            label="Backgrounds Interval (minutes)"
                            placeholder="Focus Time"
                            onChange={handleNumberChange('backgrounds_interval')}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button size={"lg"} className="mt-8 text-md w-full">
                        Set Intervals
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FocusSettingsForm