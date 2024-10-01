import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import { poppins } from "../ui/fonts";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Himmah",
  description: "Productivity App"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} antialiased !scroll-smooth`}>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}