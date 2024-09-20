'use client'

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const useFriendRequestNotifications = (userId: string): number => {
    const [friendRequestCount, setFriendRequestCount] = useState<number>(0);

    const supabase = createClient()

    useEffect(() => {
        if (!userId) return;

        const friendRequestSubscription = supabase
            .channel(`friends:friend_id=eq.${userId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                },
                (payload) => {
                    console.log('Nieuw vriendschapsverzoek ontvangen:', payload.new);
                    setFriendRequestCount((prev) => prev + 1)
                }
            )
            .subscribe();

        // Clean-up de subscription bij unmount
        return () => {
            supabase.removeChannel(friendRequestSubscription);
        }
    }, [userId]);

    return friendRequestCount;
};

export default useFriendRequestNotifications;
