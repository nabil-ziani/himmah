'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Friendship } from "@/lib/types";
import { fetchProfileData } from '@/lib/utils';

const useFriendRequests = (userId: string) => {
    const [friendships, setFriendships] = useState<Friendship[]>([]);
    const [pendingRequests, setPendingRequests] = useState<Friendship[]>([]);
    const supabase = createClient();

    useEffect(() => {
        if (!userId) return;

        const fetchFriendships = async () => {
            const { data: friendsData, error } = await supabase
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
            if (error) {
                console.error("Error fetching friendships:", error)
            } else {
                setFriendships(friendsData.filter(f => f.status === 'accepted'))
                setPendingRequests(friendsData.filter(f => f.status === 'pending' && f.friend.id === userId))
            }
        }

        (async () => {
            await fetchFriendships()
        })()

        const handleInsert = async (payload: any) => {
            if (payload.new.friend_id === userId) {

                const friendProfile = await fetchProfileData(supabase, payload.new.user_id)
                const userProfile = await fetchProfileData(supabase, payload.new.friend_id)

                if (friendProfile && userProfile) {
                    const newRequest: Friendship = {
                        id: payload.new.id,
                        status: payload.new.status,
                        friend: friendProfile,
                        user: userProfile
                    }

                    setPendingRequests(prev => [...prev, newRequest]);
                }
            }
        }

        const handleUpdate = async (payload: any) => {
            if (payload.new.friend_id === userId && payload.new.status === 'accepted') {
                console.log('Vriendschapsverzoek geaccepteerd: ', payload);

                const friendProfile = await fetchProfileData(supabase, payload.new.user_id)
                const userProfile = await fetchProfileData(supabase, payload.new.friend_id)

                if (friendProfile && userProfile) {
                    const newFriendship: Friendship = {
                        id: payload.new.id,
                        status: payload.new.status,
                        friend: friendProfile,
                        user: userProfile
                    }

                    setPendingRequests(prev => prev.filter(req => req.id !== payload.new.id))
                    setFriendships(prev => [...prev, newFriendship])
                }
            }
        }

        const handleRejection = async (payload: any) => {
            setPendingRequests(prev => prev.filter(req => req.id !== payload.old.id));
        }

        const subscription = supabase
            .channel(`realtime friends`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'friends' }, handleInsert)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'friends' }, handleUpdate)
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'friends' }, handleRejection)
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        }
    }, [userId])

    return { friendships, pendingRequests }
}

export default useFriendRequests;