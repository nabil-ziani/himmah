'use client'

import { createClient } from "@/utils/supabase/client";
import { Badge } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const FriendsList = () => {
    const [friendships, setFriendships] = useState<any[]>([]);

    const supabase = createClient()

    useEffect(() => {
        // Get list of friends when component is mounted
        const getFriends = async () => {
            // Retrieve current user
            const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
            if (userError || !currentUser) {
                return { error: "Failed to retrieve the current user." }
            }

            // Ophalen van de vrienden waar de huidige gebruiker bij betrokken is (als verzender of ontvanger)
            const { data, error } = await supabase
                .from('friends')
                .select(`
                    id,
                    status,
                    friend:profiles!friends_friend_id_fkey (
                        id,
                        name,
                        email
                    ),
                    user:profiles!friends_user_id_fkey (
                        id,
                        name,
                        email
                    )
                `)
                .or(`user_id.eq.${currentUser.id}, friend_id.eq.${currentUser.id}`)

            if (error) {
                toast.error(error.message)
            } else {
                setFriendships(data || [])
            }
        }

        getFriends()
    }, []);

    const handleAccept = async (friendshipId: string) => {
        const { error } = await supabase
            .from('friends')
            .update({ status: 'accepted' })
            .eq('id', friendshipId);

        if (!error) {
            setFriendships((prevFriends) =>
                prevFriends.map((friend) =>
                    friend.id === friendshipId ? { ...friend, status: 'accepted' } : friend
                )
            )
            toast.success('Friend request accepted!')
        } else {
            toast.error(error.message);
        }
    };

    const handleReject = async (friendshipId: string) => {
        const { error } = await supabase
            .from('friends')
            .update({ status: 'rejected' })
            .eq('id', friendshipId)

        if (!error) {
            setFriendships((prevFriends) =>
                prevFriends.map((friend) =>
                    friend.id === friendshipId ? { ...friend, status: 'rejected' } : friend
                )
            )
            toast.success('Friend request rejected!')
        } else {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h2 className='font-bold leading-none text-[#303030] text-3xl mb-5 text-center'>
                Your Friends
            </h2>
            <ul>
                {friendships.map((f) => {
                    return (
                        <li key={f.id} className="flex m-5 gap-5">
                            <div className="flex justify-between w-96 bg-gray-200 rounded-xl relative">
                                <div className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                    <span className="block text-gray-900 font-medium">{f.friend.name}</span>
                                    <span className="block mt-1 text-gray-500">{f.friend.email}</span>
                                </div>
                                <span className="absolute right-2 top-2 items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600">
                                    {f.status}
                                </span>
                            </div>
                            {f.status === 'pending' && (
                                <div className="flex flex-col gap-2">
                                    <Button size={"sm"} onClick={() => handleAccept(f.id)} className="text-white bg-green-500">
                                        Accept
                                    </Button>
                                    <Button size={"sm"} onClick={() => handleReject(f.id)} className="text-white bg-[#FF5C5C]">
                                        Reject
                                    </Button>
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default FriendsList