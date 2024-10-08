'use client'

import { Friend, Friendship } from '@/lib/types';
import { createContext, useContext } from 'react';
import { ReactNode } from 'react';
import useFriendRequests from '@/hooks/useFriendRequests'

interface FriendContextType {
    friendships: Friend[]
    pendingRequests: Friend[]
    onlineUsers: string[]
}

const FriendContext = createContext<FriendContextType | undefined>(undefined);

export const useFriendContext = () => {
    const context = useContext(FriendContext);
    if (!context) {
        throw new Error('useFriendContext must be used within a FriendProvider');
    }
    return context;
}

export const FriendProvider = ({ userId, children }: { userId: string, children: ReactNode }) => {
    const { friendships, pendingRequests, onlineUsers } = useFriendRequests(userId);

    const value = { friendships, pendingRequests, onlineUsers };

    return (
        <FriendContext.Provider value={value}>
            {children}
        </FriendContext.Provider>
    );
};
