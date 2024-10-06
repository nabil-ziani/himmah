'use client'

import { UserRoundX } from "lucide-react"
import UpdateProfileForm from "./forms/update-profile-form"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import ConfigurationForm from "./forms/configuration-form"
import DeleteAccountModal from "./delete-account-modal"
import { User } from "@supabase/supabase-js"
import { useState } from "react"

interface SettingsCardProps {
    user: User
}

const SettingsCard = ({ user }: SettingsCardProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
            <div className="flex h-[calc(100vh-250px)]">
                <section className="flex relative h-full flex-1 flex-col p-8 sm:px-14 w-[50vw] no-scrollbar overflow-y-scroll scroll-pb-5">
                    <div className="flex justify-between">
                        <UpdateProfileForm user={user} />
                        <div>
                            <Button className="text-white" onClick={() => setIsOpen(true)}>
                                <UserRoundX className="mr-3 h-5 w-5" /> Delete Account
                            </Button>
                        </div>
                    </div>
                    <ConfigurationForm />
                </section>
            </div>

            <DeleteAccountModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </Card>
    )
}

export default SettingsCard