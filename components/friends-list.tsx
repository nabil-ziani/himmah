'use client'

import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import FriendshipCard from "./friendship-card";
import { User } from "@supabase/supabase-js";
import { useFriendContext } from "@/contexts/friendshipContext";

interface FriendsListProps {
    user: User
}

const FriendsList = ({ user }: FriendsListProps) => {
    const supabase = createClient()

    const { friendships, pendingRequests } = useFriendContext()

    const handleAccept = async (friendshipId: string) => {
        const { error } = await supabase
            .from('friends')
            .update({ status: 'accepted' })
            .eq('id', friendshipId);

        if (!error) {
            toast.success('Friend request accepted!');
        } else {
            toast.error(error.message);
        }
    }

    const handleReject = async (friendshipId: string) => {
        const { error } = await supabase
            .from('friends')
            .delete()
            .eq('id', friendshipId);

        if (!error) {
            toast.success('Friend request rejected!');
        } else {
            toast.error(error.message);
        }
    }

    const handleDelete = async (friendshipId: string, friendName: string) => {
        const { error } = await supabase
            .from('friends')
            .delete()
            .eq('id', friendshipId)

        if (!error) {
            toast.success(`${friendName} has been removed!`);
        } else {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex flex-col gap-y-10">
            {pendingRequests.length > 0 && (
                <>
                    <h2 className='font-bold leading-none text-[#303030] text-3xl mb-2 text-center'>
                        Pending Requests
                    </h2>
                    <ul>
                        {pendingRequests.map((f) => {
                            return (
                                <FriendshipCard key={f.id} friendship={f} currentUser={user} handleAccept={handleAccept} handleReject={handleReject} />
                            )
                        })}
                    </ul>
                </>
            )}
            <h2 className='font-bold leading-none text-[#303030] text-3xl mb-2 text-center'>
                Your Friends
            </h2>
            <ul>
                {friendships.map((f) => {
                    return (
                        <FriendshipCard key={f.id} friendship={f} currentUser={user} handleDelete={handleDelete} />
                    )
                })}
            </ul>
        </div>
    )
}

export default FriendsList