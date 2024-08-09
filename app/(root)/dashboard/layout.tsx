import DashboardNavbar from '@/components/dashboard-nav';
import Sidebar from '@/components/sidebar';
import { Metadata } from 'next';
import { ReactNode } from 'react'

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Himmah",
    description: "Productivity App"
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main className='relative text-foreground bg-background'>
            <DashboardNavbar />
            <div className='flex'>
                <Sidebar />
                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default RootLayout