'use client'

import { Plus } from "lucide-react"
import FriendsList from "./friends-list"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import FriendsModal from "./friends-modal"
import { useState } from "react"
import { User } from "@supabase/supabase-js"

interface FriendsCardProps {
    user: User
}

const FriendsCard = ({ user }: FriendsCardProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Card className='flex-1 flex-col w-full max-w-[50vw] bg-white shadow-xl rounded-2xl'>
            <div className="flex flex-1 flex-col items-center p-12">
                <FriendsList user={user} />
                <Button size={"lg"} className="bg-green-500/80  hover:bg-green-500/90 text-white text-xl hover:cursor-pointer w-fit mt-5" onClick={() => setIsOpen(true)}>
                    <Plus className="mr-3" />
                    Add Friend
                </Button>
            </div>
            <FriendsModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </Card>
    )
}

export default FriendsCard