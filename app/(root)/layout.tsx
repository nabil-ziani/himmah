import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"
import { poppins, nunito } from "../ui/fonts"
import { Toaster } from "react-hot-toast"

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Himmah",
	description: "Productivity App"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className={`${poppins.variable} ${nunito.variable}`}>
			<body className="font-poppins antialiased">
				<ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
					<Toaster position='top-right' containerStyle={{ top: 100, right: 20 }} />
					{children}
				</ThemeProvider>
			</body>
		</html >
	)
}