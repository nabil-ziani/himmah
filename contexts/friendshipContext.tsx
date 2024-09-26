'use client'

import { Friendship } from '@/lib/types';
import { createContext, useContext } from 'react';
import { ReactNode } from 'react';
import useFriendRequests from '@/hooks/useFriendRequests'

interface FriendContextType {
    friendships: Friendship[];
    pendingRequests: Friendship[];
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
    const { friendships, pendingRequests } = useFriendRequests(userId);

    const value = { friendships, pendingRequests };

    return (
        <FriendContext.Provider value={value}>
            {children}
        </FriendContext.Provider>
    );
};
