'use client'

import { User } from "@supabase/supabase-js"
import { Button } from "./ui/button"
import { UserRoundX } from "lucide-react"
import { Friendship } from "@/lib/types"
import { useEffect, useState } from "react"
import { GoClockFill } from "react-icons/go";
import { useSupabase } from "@/contexts/supabaseClient"
import toast from "react-hot-toast"

interface FriendshipCardProps {
    friendship: Friendship
    currentUser: User
    handleAccept?: (friendshipId: string) => Promise<void>
    handleReject?: (friendshipId: string) => Promise<void>
    handleDelete?: (friendshipId: string, name: string) => Promise<void>
    isOnline: boolean
}

const FriendshipCard = ({ friendship, currentUser, handleAccept, handleReject, handleDelete, isOnline }: FriendshipCardProps) => {
    const [todayFocusTime, setTodayFocusTime] = useState<number | null>(null)

    const supabase = useSupabase()

    const friendName = friendship?.friend?.id === currentUser.id ? friendship.user.name : friendship.friend.name

    useEffect(() => {
        const fetchTodayFocusTime = async () => {
            const userId = friendship?.friend?.id === currentUser.id ? friendship.user.id : friendship.friend.id

            const { data, error } = await supabase
                .from('profiles')
                .select('today_focus_time')
                .eq('id', userId)
                .single()

            if (error) {
                toast.error(error.message)
                console.error('Error fetching focus sessions:', error)
                return;
            }

            setTodayFocusTime(data?.today_focus_time ?? 0)
        }

        fetchTodayFocusTime()
    }, [supabase, friendship, currentUser])

    const formatFocusTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)

        const formattedHours = String(hours).padStart(2, '0')
        const formattedMinutes = String(minutes).padStart(2, '0')

        return `${formattedHours}:${formattedMinutes}`
    }

    return (
        <li key={friendship.id} className="flex m-5 gap-4">
            <div className="flex justify-between items-center w-[450px] bg-gray-200 rounded-md relative px-2">
                <div className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 flex gap-2 items-center">
                    <span className={`inline-block h-3 w-3 rounded-full mr-4 ${isOnline ? 'bg-green-300' : 'bg-gray-400'}`} />
                    <span className="block text-gray-900 font-bold">{friendName}</span>
                </div>
                {todayFocusTime !== null && (
                    <span className="mr-2 text-gray-900 flex items-center">
                        <GoClockFill className="h-5 w-5 mr-2" />
                        <span className="font-nunito">
                            {formatFocusTime(todayFocusTime)}
                        </span>
                    </span>
                )}
            </div>
            {friendship.status === 'accepted' && (
                <div className="flex items-center justify-center bg-[#FF5C5C] cursor-pointer rounded-md">
                    <span onClick={() => handleDelete!(friendship.id, friendName!)} className="p-3">
                        <UserRoundX className="h-5 w-5" color="white" />
                    </span>
                </div>
            )}
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