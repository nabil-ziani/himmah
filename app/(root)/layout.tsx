import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"
import { poppins, nunito } from "../ui/fonts"
import { Toaster } from "react-hot-toast"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from "next/head"

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Himmah",
	description: "Productivity App"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className={`${poppins.variable} ${nunito.variable}`}>
			<Head>
				<link rel="preload" href="/hero.jpg" as="image" />
			</Head>
			<body className="font-poppins antialiased">
				<ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
					<Toaster position='top-right' containerStyle={{ top: 100, right: 20 }} />
					{children}
				</ThemeProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html >
	)
}