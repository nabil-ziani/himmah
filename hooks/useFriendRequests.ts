'use client'

import { useEffect, useState } from 'react'
import { Friendship } from "@/lib/types";
import { fetchProfileData } from '@/lib/utils';
import { useSupabase } from '@/contexts/supabaseClient';
import toast from 'react-hot-toast';

const useFriendRequests = (userId: string) => {
    const [friendships, setFriendships] = useState<Friendship[]>([])
    const [pendingRequests, setPendingRequests] = useState<Friendship[]>([])
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    const supabase = useSupabase()

    useEffect(() => {
        if (!userId) return;

        const fetchFriendships = async () => {
            const { data: friendsData, error } = await supabase
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
                const acceptedFriends = friendsData.filter(f => f.status === 'accepted');

                const sortedFriends = acceptedFriends.sort((a, b) => {
                    const friendAFocusTime = a.friend.day_focus_time || 0
                    const friendBFocusTime = b.friend.day_focus_time || 0
                    return friendBFocusTime - friendAFocusTime
                })

                setFriendships(sortedFriends)
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