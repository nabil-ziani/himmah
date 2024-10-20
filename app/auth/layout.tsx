import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import { poppins } from "../ui/fonts";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Himmah",
    description: "Productivity App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning >
            <body className={`${poppins.className} antialiased`}>
                <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}