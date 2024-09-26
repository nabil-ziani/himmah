'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Friendship } from "@/lib/types";
import { fetchProfileData } from '@/lib/utils';

const useFriendRequests = (userId: string) => {
    const [friendships, setFriendships] = useState<Friendship[]>([])
    const [pendingRequests, setPendingRequests] = useState<Friendship[]>([])
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])
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
                        email,
                        is_online
                    ),
                    user:user_id(
                        id,
                        name,
                        email,
                        is_online
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

        const handleDelete = async (payload: any) => {
            setFriendships(prev => prev.filter(req => req.id !== payload.old.id))
            setPendingRequests(prev => prev.filter(req => req.id !== payload.old.id))
        }

        // Subscribe to friends updates
        const friendSubscription = supabase
            .channel(`realtime friends`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'friends' }, handleInsert)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'friends' }, handleUpdate)
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'friends' }, handleDelete)
            .subscribe()

        const presenceChannel = supabase.channel('presence:friends', {
            config: {
                presence: {
                    key: userId, // Use userId to track the user in the presence channel
                },
            },
        })

        console.log('Gebruikers-ID voor Presence Kanaal:', userId);

        presenceChannel.on('presence', { event: 'sync' }, () => {
            console.log('Presence sync triggered');
            const presenceState = presenceChannel.presenceState();
            console.log('Presence State:', presenceState); // Moet de ID's tonen van online gebruikers
            const onlineFriends = Object.keys(presenceState);
            console.log('Online friends:', onlineFriends); // Lijst met online vrienden
            setOnlineUsers(onlineFriends);
        });

        presenceChannel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                console.log('Presence channel subscribed')
            }
        })

        presenceChannel.track({
            userId: userId,
            status: 'online',
        })
            .then(() => console.log('User is being tracked successfully'))
            .catch(err => console.error('Error tracking user:', err));


        return () => {
            supabase.removeChannel(friendSubscription)
            presenceChannel.unsubscribe()
        }
    }, [userId, supabase])

    return { friendships, pendingRequests, onlineUsers }
}

export default useFriendRequests;