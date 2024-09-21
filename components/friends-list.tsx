'use client'

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FriendshipCard from "./friendship-card";

const FriendsList = () => {
    const [friendships, setFriendships] = useState<any[]>([]);
    const [pendingRequests, setPendingRequests] = useState<any[]>([])

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
                .eq('status', 'accepted')
                .or(`user_id.eq.${currentUser.id}, friend_id.eq.${currentUser.id}`)

            if (error) {
                toast.error(error.message)
            } else {
                setFriendships(data || [])
            }
        }

        const getPendingRequests = async () => {
            // Retrieve current user
            const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
            if (userError || !currentUser) {
                return { error: "Failed to retrieve the current user." };
            }

            // Ophalen van de vrienden waar de huidige gebruiker de ontvanger (friend_id) is
            const { data: pendingRequests, error: pendingError } = await supabase
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
                .eq('status', 'pending') // Filter alleen pending verzoeken
                .eq('friend_id', currentUser.id); // Huidige gebruiker is de ontvanger

            if (pendingError) {
                toast.error(pendingError.message);
            } else {
                setPendingRequests(pendingRequests || []);
            }
        };

        getFriends()
        getPendingRequests()
    }, []);

    const handleAccept = async (friendshipId: string) => {
        const { error } = await supabase
            .from('friends')
            .update({ status: 'accepted' })
            .eq('id', friendshipId);

        if (!error) {
            setFriendships((prevFriends) => [...prevFriends, pendingRequests.find((request) => request.id === friendshipId)])
            setPendingRequests((prevRequests) => prevRequests.filter((request) => request.id !== friendshipId))

            toast.success('Friend request accepted!')
        } else {
            toast.error(error.message);
        }
    }

    const handleReject = async (friendshipId: string) => {
        const { error } = await supabase
            .from('friends')
            .delete()
            .eq('id', friendshipId); // Verwijder het verzoek op basis van id

        if (!error) {
            setPendingRequests((prevRequests) => prevRequests.filter((request) => request.id !== friendshipId))

            toast.success('Friend request rejected and removed!');
        } else {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex flex-col gap-y-10">
            {pendingRequests.length > 0 && (
                <>
                    <h2 className='font-bold leading-none text-[#303030] text-3xl mb-5 text-center'>
                        Pending Requests
                    </h2>
                    <ul>
                        {pendingRequests.map((f) => {
                            return (
                                <FriendshipCard key={f.id} friendship={f} handleAccept={handleAccept} handleReject={handleReject} />
                            )
                        })}
                    </ul>
                </>
            )}
            <h2 className='font-bold leading-none text-[#303030] text-3xl mb-5 text-center'>
                Your Friends
            </h2>
            <ul>
                {friendships.map((f) => {
                    return (
                        <FriendshipCard key={f.id} friendship={f} />
                    )
                })}
            </ul>
        </div>
    )
}

export default FriendsList