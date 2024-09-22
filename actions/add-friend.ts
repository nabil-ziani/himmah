'use server'

import * as z from 'zod'

import { AddFriendSchema } from '@/schemas';
import { createClient } from "@/utils/supabase/server";

export const addFriend = async (values: z.infer<typeof AddFriendSchema>) => {
    const validatedFields = AddFriendSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
    }

    const { email } = validatedFields.data

    const supabase = createClient();

    // Search user based on entered email in `profiles` table
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', email)
        .single()


    if (profileError) {
        return { error: "No user found with this email." };
    }

    // Check if user is trying to add himself
    const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
    if (userError || !currentUser) {
        return { error: "Failed to retrieve the current user." };
    }

    if (profile.id === currentUser.id) {
        return { error: "You cannot send a friend request to yourself." };
    }

    // Check if users already have a friendship request
    const { data: existingRequest, error: friendError } = await supabase
        .from('friends')
        .select('id')
        .or(`user_id.eq.${currentUser.id}, friend_id.eq.${currentUser.id}`)
        .eq('friend_id', profile.id)
        .single();

    if (existingRequest)
        return { error: "A friend request already exists." }


    // Add friend request to `friends` table
    const { data, error } = await supabase
        .from('friends')
        .insert({
            user_id: currentUser.id, // sender
            friend_id: profile.id,   // receiver
            status: 'pending',
        })
        .select()
        .single();

    if (error) {
        return { error: error.message }
    } else {
        return { success: 'Friend request sent!', data }
    }
}