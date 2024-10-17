import { poppins, nunito } from "../ui/fonts"

import "../globals.css"

import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/theme-provider"

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
				<link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" as="style" />
			</Head>
			<body className="font-poppins antialiased">
				<ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
					<Toaster position='top-right' containerStyle={{ top: 100, right: 20 }} />
					{children}
				</ThemeProvider>
			</body>
		</html >
	)
}