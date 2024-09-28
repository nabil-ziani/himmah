'use client'

import { User } from "@supabase/supabase-js"
import { Button } from "./ui/button"
import { UserRoundX } from "lucide-react"
import { Friendship } from "@/lib/types"
import { useEffect, useState } from "react"
import { GoClockFill } from "react-icons/go";
import { useSupabase } from "@/contexts/supabaseClient"

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
        const parseDuration = (duration: string) => {
            const [hours, minutes, seconds] = duration.split(':').map(Number)
            return hours * 60 + minutes + seconds / 60
        }

        const fetchTodayFocusTime = async () => {
            const userId = friendship?.friend?.id === currentUser.id ? friendship.user.id : friendship.friend.id

            const today = new Date()
            const todayStart = new Date(today.setHours(0, 0, 0, 0)).toISOString()
            const todayEnd = new Date(today.setHours(23, 59, 59, 999)).toISOString()

            const { data, error } = await supabase
                .from('focus_sessions')
                .select('duration')
                .eq('user_id', userId)
                .eq('completed', true)
                .gte('start_time', todayStart)
                .lte('end_time', todayEnd)

            if (error) {
                console.error('Error fetching focus sessions:', error)
                return;
            }

            if (data && data.length > 0) {
                // Calculate total focus time in minutes by parsing each duration string
                const totalMinutes = data.reduce((acc: any, session: any) => acc + parseDuration(session.duration), 0)

                // Convert minutes to hours and decimal format (1.25 hours for 1 hour and 15 minutes)
                const totalHours = (totalMinutes / 60).toFixed(2)

                setTodayFocusTime(Number(totalHours))
            } else {
                // If no focus sessions are found, set the focus time to 0
                setTodayFocusTime(0)
            }
        }

        fetchTodayFocusTime();
    }, [supabase, friendship, currentUser])

    const formatTime = (focusTime: number) => {
        const hours = Math.floor(focusTime)
        const minutes = Math.round((focusTime - hours) * 60)

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    };

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
                            {formatTime(todayFocusTime)}
                        </span>
                    </span>
                )}
            </div>
            {friendship.status === 'accepted' && (
                <div className="flex items-center justify-center bg-[#FF5C5C] cursor-pointer rounded-md">
                    <span onClick={() => handleDelete!(friendship.id, friendName)} className="p-3">
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
        </li >
    )
}

export default FriendshipCard