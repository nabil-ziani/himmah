'use client'

import { useEffect, useState } from 'react'
import { Friend, Friendship } from "@/lib/types";
import { fetchProfile } from '@/lib/utils';
import { useSupabase } from '@/contexts/supabaseClient';
import toast from 'react-hot-toast';
import { Tables } from '@/database.types';
import { RealtimePostgresDeletePayload, RealtimePostgresInsertPayload, RealtimePostgresUpdatePayload } from '@supabase/supabase-js';

const useFriendRequests = (userId: string) => {
    const [friendships, setFriendships] = useState<Friend[]>([])
    const [pendingRequests, setPendingRequests] = useState<Friend[]>([])
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    const supabase = useSupabase()

    useEffect(() => {
        if (!userId) return;

        const fetchFriendships = async () => {
            const { data: profile } = await supabase
                .from('profiles')
                .select()
                .eq('id', userId)
                .single()

            const { data: friendships, error } = await supabase
                .from("friends")
                .select(`
                    id,
                    status,
                    friend:friend_id(*),
                    user:user_id(*)
                `)
                .or(`user_id.eq.${userId}, friend_id.eq.${userId}`)
                .returns<Friendship[]>()

            if (error) {
                toast.error(error.message)
                console.error("Error fetching friendships:", error)
            } else {
                const acceptedFriends = friendships
                    .filter(f => f.status === 'accepted')
                    .map(f => ({ friendship_id: f.id, profile: (f.friend.id === userId ? f.user : f.friend) }))

                // --- add own profile to the list 
                if (profile) {
                    if (!acceptedFriends.some(friend => friend.profile.id === userId)) {
                        acceptedFriends.unshift({ friendship_id: '', profile: profile })
                    }
                }

                // should only be visible for the receiver
                const pendingFriends = friendships
                    .filter(f => f.status === 'pending' && f.friend.id === userId)
                    .map(f => ({ friendship_id: f.id, profile: f.user }))

                setFriendships(acceptedFriends)
                setPendingRequests(pendingFriends)
            }
        }

        (async () => {
            await fetchFriendships()
        })()

        const handleInsert = async (payload: RealtimePostgresInsertPayload<Tables<'friends'>>) => {
            // On insert we will only set pending_requests for the receiver (friend_id)
            if (payload.new.friend_id === userId) {
                // I only need userProfile, because only receiver will get a notification of the sender (user_id)
                const profile = await fetchProfile(supabase, payload.new.user_id)

                if (profile) {
                    setPendingRequests(prev => [...prev, { friendship_id: payload.new.id, profile }]);
                }
            }
        }

        const handleUpdate = async (payload: RealtimePostgresUpdatePayload<Tables<'friends'>>) => {
            // senders profile (which is the one who's details you want to show for the receiver)
            const actionProfile = await fetchProfile(supabase, payload.new.user_id)
            // receivers profile
            const expectingProfile = await fetchProfile(supabase, payload.new.friend_id)

            if (payload.new.friend_id === userId && payload.new.status === 'accepted') {
                setPendingRequests(prev => prev.filter(req => req.friendship_id !== payload.new.id))
                setFriendships(prev => [...prev, { friendship_id: payload.new.id, profile: actionProfile }])
            } else if (payload.new.status === 'accepted') {
                setFriendships(prev => [...prev, { friendship_id: payload.new.id, profile: expectingProfile }])
            }
        }

        const handleDelete = async (payload: RealtimePostgresDeletePayload<Tables<'friends'>>) => {
            setFriendships(prev => prev.filter(req => req.friendship_id !== payload.old.id))
            setPendingRequests(prev => prev.filter(req => req.friendship_id !== payload.old.id))
        }

        // Subscribe to friends updates
        const friendSubscription = supabase
            .channel(`realtime friends`)
            .on<Tables<'friends'>>('postgres_changes', { event: 'INSERT', schema: 'public', table: 'friends' }, handleInsert)
            .on<Tables<'friends'>>('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'friends' }, handleUpdate)
            .on<Tables<'friends'>>('postgres_changes', { event: 'DELETE', schema: 'public', table: 'friends' }, handleDelete)
            .subscribe()

        const presenceChannel = supabase.channel('presence:friends', {
            config: {
                presence: {
                    key: userId, // Use userId to track the user in the presence channel
                },
            },
        })

        presenceChannel.on('presence', { event: 'sync' }, () => {
            const presenceState = presenceChannel.presenceState();
            const onlineFriends = Object.keys(presenceState);
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