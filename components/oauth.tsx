import { type Provider } from '@supabase/supabase-js';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { SiDiscord } from "react-icons/si";

type OAuthProviders = {
    name: Provider;
    icon: JSX.Element;
};

export default function OauthSignIn() {
    const oAuthProviders: OAuthProviders[] = [
        {
            name: 'google',
            icon: <FcGoogle className="h-5 w-5" />
        },
        {
            name: 'facebook',
            icon: <FaFacebook className="h-5 w-5" color='#0865fe' />
        },
        {
            name: 'discord',
            icon: <SiDiscord className="h-5 w-5" color='#5d6bf2' />
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
                        className="aspect-square w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-700 transition-colors duration-300 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                    >
                        {provider.icon}
                    </button>
                </form>
            ))}
        </div>
    );
}