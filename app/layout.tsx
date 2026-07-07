import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolify | Create Your Portfolio in Minutes",
  description: "The easiest way to build and share your professional portfolio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  
  let isSubdomain = false;
  if (host.includes('localhost')) {
    const parts = host.split('.');
    if (parts.length > 1 && parts[0] !== 'localhost' && parts[0] !== 'www') {
      isSubdomain = true;
    }
  } else {
    const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'portfolify.com';
    if (host.endsWith(mainDomain) && host !== mainDomain && host !== `www.${mainDomain}`) {
      isSubdomain = true;
    }
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          {!isSubdomain && <Navbar />}
          <main className="flex-grow">
            {children}
          </main>
          {!isSubdomain && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
