'use client'

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Friendship } from "@/lib/types";

const useRealtimeFriendships = (userId: string) => {
    const [friendships, setFriendships] = useState<any[]>([]);
    const [pendingRequests, setPendingRequests] = useState<any[]>([]);
    const supabase = createClient();

    useEffect(() => {
        if (!userId) return;

        const fetchFriendships = async () => {
            // Haal alle vrienden en pending requests op
            const { data: friendsData } = await supabase
                .from("friends")
                .select(`
                    id,
                    status,
                    friend:friend_id(
                        id,
                        name,
                        email
                    ),
                    user:user_id(
                        id,
                        name,
                        email
                    )
                `)
                .or(`user_id.eq.${userId}, friend_id.eq.${userId}`)
                .returns<Friendship[]>()

            if (friendsData) {
                setFriendships(friendsData.filter(f => f.status === 'accepted'));
                setPendingRequests(friendsData.filter(f => f.status === 'pending' && f.friend.id === userId))
            }
        };

        // Initieel ophalen van vrienden en pending requests
        fetchFriendships();

        // Realtime abonnement op updates in de "friends" tabel
        const subscription = supabase
            .channel(`friends`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "friends"
                },
                (payload) => {
                    fetchFriendships()
                }
            )
            .subscribe();

        // Cleanup subscription bij unmount
        return () => {
            supabase.removeChannel(subscription)
        };
    }, [userId]);

    return { friendships, pendingRequests }
};

export default useRealtimeFriendships
