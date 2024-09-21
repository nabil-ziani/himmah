'use client'

import { Button } from "./ui/button"

interface FriendshipCardProps {
    friendship: any
    handleAccept?: (friendshipId: string) => Promise<void>
    handleReject?: (friendshipId: string) => Promise<void>
}

const FriendshipCard = ({ friendship, handleAccept, handleReject }: FriendshipCardProps) => {

    return (
        <li key={friendship.id} className="flex m-5 gap-5">
            <div className="flex justify-between w-96 bg-gray-200 rounded-xl relative">
                <div className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 flex gap-2 items-center">
                    <span className="inline-block h-3 w-3 rounded-full bg-green-300 ring-2 ring-white mr-4" />
                    <span className="block text-gray-900 font-bold">{friendship.friend.name}</span>
                </div>
                {/* <span className="absolute right-2 top-2 items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600">
                    {friendship.status}
                </span> */}
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
        </li>
    )
}

export default FriendshipCard