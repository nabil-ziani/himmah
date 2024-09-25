'use client'

import { User } from "@supabase/supabase-js"
import { Button } from "./ui/button"
import { Clock, Trash2 } from "lucide-react"
import { Friendship } from "@/lib/types"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

interface FriendshipCardProps {
    friendship: Friendship
    currentUser: User
    handleAccept?: (friendshipId: string) => Promise<void>
    handleReject?: (friendshipId: string) => Promise<void>
    handleDelete?: (friendshipId: string, name: string) => Promise<void>
}

const FriendshipCard = ({ friendship, currentUser, handleAccept, handleReject, handleDelete }: FriendshipCardProps) => {
    const [totalFocusTime, setTotalFocusTime] = useState<number | null>(null);

    const supabase = createClient()

    const friendName = friendship?.friend?.id === currentUser.id ? friendship.user.name : friendship.friend.name
    const friendActive = friendship?.friend?.id === currentUser.id ? friendship.user.is_online : friendship.friend.is_online

    useEffect(() => {
        const fetchTotalFocusTime = async () => {
            const userId = friendship?.friend?.id === currentUser.id ? friendship.user.id : friendship.friend.id

            const { data, error } = await supabase
                .from('focus_sessions')
                .select('duration')
                .eq('user_id', userId)
                .eq('completed', true)

            if (error) {
                console.error('Error fetching focus sessions:', error);
                return;
            }

            // Calculate the total focus time in minutes
            const totalTime = data?.reduce((acc, session: any) => acc + session.duration, 0)
            setTotalFocusTime(totalTime || 0)
        }

        fetchTotalFocusTime();
    }, [supabase, friendship, currentUser]);


    return (
        <li key={friendship.id} className="flex m-5 gap-5">
            <div className="flex justify-between items-center w-[450px] bg-gray-200 rounded-xl relative px-2">
                <div className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 flex gap-2 items-center">
                    <span className={`inline-block h-3 w-3 rounded-full mr-4 ${friendActive ? 'bg-green-300' : 'bg-red-300'}`} />
                    <span className="block text-gray-900 font-bold">{friendName}</span>
                    {totalFocusTime !== null && (
                        <span className="ml-4 text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {totalFocusTime}
                        </span>
                    )}
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