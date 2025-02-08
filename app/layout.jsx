import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
// import DynamicNavbar from "@/components/dynamic-navbar";
import TestNavbar from "@/components/test-navbar";
import Footer from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "xprod",
  description: "All-In-One!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <DynamicNavbar /> */}
          <TestNavbar />
          <main className="font-sans pt-8 grid min-h-[100dvh] w-full grid-rows-[1fr_auto]">
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
