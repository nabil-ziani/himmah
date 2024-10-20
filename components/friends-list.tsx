'use client'

import toast from "react-hot-toast";
import FriendshipCard from "./friendship-card";
import { User } from "@supabase/supabase-js";
import { useFriendContext } from "@/contexts/friendshipContext";
import { useSupabase } from "@/contexts/supabaseClient";
import { Friend } from "@/lib/types";

interface FriendsListProps {
    user: User
}

const FriendsList = ({ user }: FriendsListProps) => {
    const supabase = useSupabase()

    const { friendships, pendingRequests, onlineUsers } = useFriendContext()

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

    const handleDelete = async (friend: Friend) => {
        const { error } = await supabase
            .from('friends')
            .delete()
            .eq('id', friend.friendship_id!)

        if (!error) {
            toast.success(`${friend.profile.name} has been removed!`);
        } else {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex-1 flex-col gap-y-10 justify-between">
            {pendingRequests.length > 0 && (
                <>
                    <h2 className='font-bold leading-none text-[#303030] text-3xl text-center'>
                        Pending Requests
                    </h2>
                    <ul className="flex flex-1 flex-col items-center no-scrollbar overflow-y-scroll mb-5">
                        {pendingRequests.map((f) => {
                            // als degene die het verzoek heeft ontvangen gelijk is aan de ingelogde gebruiker, gebruik dan user_id anders friend_id
                            const isFriendOnline = onlineUsers.includes(f?.profile?.id)

                            return (
                                <FriendshipCard key={f.friendship_id} friend={f} handleAccept={handleAccept} handleReject={handleReject} isOnline={isFriendOnline} status="pending" />
                            )
                        })}
                    </ul>
                </>
            )}
            <h2 className='font-bold leading-none text-[#303030] text-3xl text-center'>
                Your Friends
            </h2>
            <ul className="flex flex-1 flex-col items-center no-scrollbar overflow-y-scroll">
                {friendships.length > 0 && friendships
                    .sort((a, b) => {
                        const friendAFocusTime = a.profile.day_focus_time || 0
                        const friendBFocusTime = b.profile.day_focus_time || 0
                        return friendBFocusTime - friendAFocusTime
                    })
                    .map((f) => {
                        const isFriendOnline = onlineUsers.includes(f?.profile?.id)

                        return (
                            <FriendshipCard key={f.friendship_id} friend={f} handleDelete={handleDelete} isOnline={isFriendOnline} status="accepted" />
                        )
                    })}
            </ul>
        </div>
    )
}

export default FriendsList