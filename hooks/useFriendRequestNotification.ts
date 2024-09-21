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
                .eq('status', 'pending'); // Zorg ervoor dat je alleen pending requests ophaalt

            if (error) {
                console.error('Error fetching pending requests:', error);
            } else {
                setFriendRequestCount(data.length);
            }
        };

        fetchPendingRequests();

        const friendRequestSubscription = supabase
            .channel('public:friends')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    filter: `friend_id=eq.${userId}`, // Filter op friend_id om alleen de ontvanger notificaties te sturen
                },
                (payload) => {
                    if (payload.new.friend_id === userId) {
                        setFriendRequestCount((prev) => prev + 1);
                    }
                }
            )
            .subscribe();

        // Clean-up de subscription bij unmount
        return () => {
            supabase.removeChannel(friendRequestSubscription)
        }
    }, [userId]);

    return friendRequestCount
};

export default useFriendRequestNotifications