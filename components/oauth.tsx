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

    // const [isSubmitting, setIsSubmitting] = useState(false);

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     setIsSubmitting(true); // Disable the button while the request is being handled
    //     await signInWithOAuth(e);
    //     setIsSubmitting(false);
    // };

    return (
        <div className="flex flex-row justify-evenly">
            {oAuthProviders.map((provider) => (
                <form key={provider.name}>
                    <input type="hidden" name="provider" value={provider.name} />

                    <button
                        type="submit"
                        className="aspect-square w-10 h-10 rounded-full bg-white flex items-center justify-center transition-colors duration-300 dark:bg-zinc-100 dark:hover:bg-zinc-600"
                    >
                        <img
                            src={provider.icon}
                            alt="oauth logo"
                            className="h-6 w-6"
                        />
                    </button>
                </form>
            ))}
        </div>
    );
}