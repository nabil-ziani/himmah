'use client'

import { Button } from "./ui/button"
import { UserRoundX } from "lucide-react"
import { Friend } from "@/lib/types"
import { GoClockFill } from "react-icons/go";
import { formatFocusTime } from "@/lib/utils"

interface FriendshipCardProps {
    friend: Friend
    handleAccept?: (friendshipId: string) => Promise<void>
    handleReject?: (friendshipId: string) => Promise<void>
    handleDelete?: (friendshipId: string, name: string) => Promise<void>
    isOnline: boolean
    status: 'pending' | 'accepted'
}

const FriendshipCard = ({ friend, handleAccept, handleReject, handleDelete, isOnline, status }: FriendshipCardProps) => {
    // Own user profile does not have friendship_id (use that for custom styling
    return (
        <li key={friend.profile.id} className="flex mt-5 m-2 gap-4">
            <div className={`flex justify-between items-center w-[450px] bg-gray-200 rounded-md relative px-2`}>
                <div className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 flex gap-2 items-center">
                    <span className={`inline-block h-3 w-3 rounded-full mr-4 ${isOnline ? 'bg-green-300' : 'bg-gray-400'}`} />
                    <span className="block text-gray-900 font-bold">{`${friend.profile.name}  ${!friend.friendship_id ? '⭐' : ''}`}</span>
                </div>
                <span className="mr-2 text-gray-900 flex items-center">
                    <GoClockFill className="h-5 w-5 mr-2" />
                    <span className="font-nunito">
                        {formatFocusTime(friend.profile.day_focus_time)}
                    </span>
                </span>
            </div>
            {(status === 'accepted') && (
                <div className={`flex items-center justify-center bg-[#FF5C5C] cursor-pointer rounded-md ${!friend.friendship_id && 'invisible'}`}>
                    <span onClick={() => handleDelete!(friend.profile.id, friend.profile.name!)} className="p-3">
                        <UserRoundX className="h-5 w-5" color="white" />
                    </span>
                </div>
            )}
            {status === 'pending' && (
                <div className="flex gap-2 items-center">
                    <Button size={"sm"} onClick={() => handleAccept!(friend.friendship_id!)} className="text-white bg-green-500">
                        Accept
                    </Button>
                    <Button size={"sm"} onClick={() => handleReject!(friend.friendship_id!)} className="text-white bg-[#FF5C5C]">
                        Reject
                    </Button>
                </div>
            )}
        </li>
    )
}

export default FriendshipCard