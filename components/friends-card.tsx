'use client'

import { Plus } from "lucide-react"
import FriendsList from "./friends-list"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import FriendsModal from "./friends-modal"
import { useState } from "react"

const FriendsCard = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
            <div className="flex flex-col items-center h-[calc(100vh-250px)] p-12 max-md:pb-14 sm:px-14 overflow-hidden w-[50vw]">
                <FriendsList />
                <Button size={"lg"} className="bg-green-500/80  hover:bg-green-500/90 text-white text-xl hover:cursor-pointer w-fit mt-10" onClick={() => setIsOpen(true)}>
                    <Plus className="mr-3" />
                    Add Friend
                </Button>
            </div>
            <FriendsModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </Card>
    )
}

export default FriendsCard