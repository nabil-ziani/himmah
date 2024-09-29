import DashboardNavbar from '@/components/dashboard-nav'
import Sidebar from '@/components/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { FriendProvider } from '@/contexts/friendshipContext'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { Toaster } from "react-hot-toast"

import { poppins, nunito } from "../../ui/fonts"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SupabaseProvider } from '@/contexts/supabaseClient'
import { createClient } from '@/utils/supabase/server'


const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Himmah",
    description: "Productivity App"
}

const queryClient = new QueryClient();

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    return (
        <SupabaseProvider>
            <QueryClientProvider client={queryClient}>
                <main className={`relative text-foreground bg-slate-50 ${poppins.variable} ${nunito.variable}`}>
                    <FriendProvider userId={user.id}>
                        <DashboardNavbar />
                        <div className='flex'>
                            <Sidebar />
                            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                                <div className="w-full relative">
                                    <Toaster position='top-right' containerStyle={{ top: 100, right: 20 }} />
                                    <TooltipProvider delayDuration={100}>
                                        {children}
                                    </TooltipProvider>
                                </div>
                            </section>
                        </div>
                    </FriendProvider>
                </main>
            </QueryClientProvider>
        </SupabaseProvider>
    );
}

export default RootLayout