'use client'

import { loginWithOAuth } from '@/actions/login';
import { type Provider } from '@supabase/supabase-js';

type OAuthProviders = {
    name: Provider;
    icon: string;
};

export default function OauthSignIn() {
    const oAuthProviders: OAuthProviders[] = [
        {
            name: 'google',
            icon: '/icons/google.svg'
        },
        {
            name: 'facebook',
            icon: '/icons/facebook.svg'
        },
        {
            name: 'discord',
            icon: '/icons/discord.svg'
        }
    ];

    const onClick = (provider: Provider) => {
        loginWithOAuth(provider)
    }

    return (
        <div className="flex flex-row justify-evenly">
            {oAuthProviders.map((provider) => (
                <button
                    key={provider.name}
                    onClick={() => onClick(provider.name)}
                    className="aspect-square w-10 h-10 rounded-full bg-white flex items-center justify-center transition-colors duration-300 dark:bg-zinc-100 dark:hover:bg-zinc-600"
                >
                    <img width={30} height={30} src={provider.icon} alt="oauth logo" />
                </button>
            ))}
        </div>
    );
}