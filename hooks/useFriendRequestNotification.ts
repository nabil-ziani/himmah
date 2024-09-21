'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

const useFriendRequestNotifications = (userId: string): number => {
    const [friendRequestCount, setFriendRequestCount] = useState<number>(0)

    const supabase = createClient()

    useEffect(() => {
        if (!userId) return

        // Haal het aantal bestaande 'pending' friend requests op
        const fetchPendingRequests = async () => {
            const { data, error } = await supabase
                .from('friends')
                .select('*', { count: 'exact' })
                .eq('friend_id', userId)
                .eq('status', 'pending');

            if (error) {
                console.error('Error fetching pending requests:', error);
            } else {
                setFriendRequestCount(data.length);
            }
        };

        fetchPendingRequests();

        const friendRequestSubscription = supabase
            .channel('friends')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    filter: `friend_id=eq.${userId}`,
                },
                (payload) => {
                    console.log(payload)
                    if (payload.new.friend_id === userId) {
                        console.log("Vriendschapsverzoek ontvangen!", payload)
                        setFriendRequestCount((prev) => prev + 1);
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    filter: `friend_id=eq.${userId}, status=eq.accepted`
                },
                (payload) => {
                    console.log(payload)
                    if (payload.new.friend_id === userId) {
                        console.log("Vriendschapsverzoek geaccepteerd!", payload)
                        setFriendRequestCount((prev) => Math.max(prev - 1, 0));
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    filter: `friend_id=eq.${userId}`
                },
                (payload) => {
                    console.log(payload)
                    if (payload.old.friend_id === userId) {
                        console.log("Vriendschapsverzoek geweigerd!", payload)
                        setFriendRequestCount((prev) => Math.max(prev - 1, 0));
                    }
                }
            )
            .subscribe();

        // Clean-up de subscription bij unmount
        return () => {
            supabase.removeChannel(friendRequestSubscription)
        }
    }, [userId]);

    return friendRequestCount;
};

export default useFriendRequestNotifications;