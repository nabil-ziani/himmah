'use client'

import { User } from "@supabase/supabase-js"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"
import { Friendship } from "@/lib/types"

interface FriendshipCardProps {
    friendship: Friendship
    currentUser: User
    handleAccept?: (friendshipId: string) => Promise<void>
    handleReject?: (friendshipId: string) => Promise<void>
    handleDelete?: (friendshipId: string, name: string) => Promise<void>
}

const FriendshipCard = ({ friendship, currentUser, handleAccept, handleReject, handleDelete }: FriendshipCardProps) => {

    const friendName = friendship?.friend?.id === currentUser.id ? friendship.user.name : friendship.friend.name
    const friendActive = friendship?.friend?.id === currentUser.id ? friendship.user.is_online : friendship.friend.is_online

    return (
        <li key={friendship.id} className="flex m-5 gap-5">
            <div className="flex justify-between items-center w-[450px] bg-gray-200 rounded-xl relative px-2">
                <div className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 flex gap-2 items-center">
                    <span className={`inline-block h-3 w-3 rounded-full mr-4 ${friendActive ? 'bg-green-300' : 'bg-red-300'}`} />
                    <span className="block text-gray-900 font-bold">{friendName}</span>
                </div>
                {friendship.status === 'accepted' && (
                    <span onClick={() => handleDelete!(friendship.id, friendName)} className="cursor-pointer">
                        <Trash2 className="mr-2 h-5 w-5" color="#FF5C5C" />
                    </span>
                )}
            </div>
            {friendship.status === 'pending' && (
                <div className="flex gap-2 items-center">
                    <Button size={"sm"} onClick={() => handleAccept!(friendship.id)} className="text-white bg-green-500">
                        Accept
                    </Button>
                    <Button size={"sm"} onClick={() => handleReject!(friendship.id)} className="text-white bg-[#FF5C5C]">
                        Reject
                    </Button>
                </div>
            )}
        </li >
    )
}

export default FriendshipCard