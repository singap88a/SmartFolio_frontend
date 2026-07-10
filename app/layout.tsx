import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { AuthProvider } from "@/context/AuthContext";
import { APP_DOMAIN, isLocalhost } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
  if (isLocalhost(host)) {
    const parts = host.split('.');
    if (parts.length > 1 && parts[0] !== 'localhost' && parts[0] !== 'www') {
      isSubdomain = true;
    }
  } else {
    const mainDomain = APP_DOMAIN;
    if (host.endsWith(mainDomain) && host !== mainDomain && host !== `www.${mainDomain}`) {
      isSubdomain = true;
    }
  }


  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-slate-100">
        <AuthProvider>
          {!isSubdomain ? (
            <div className="flex h-screen w-full overflow-hidden font-cairo" dir="rtl">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden w-full">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto bg-[#0B0F19]">
                  {children}
                </main>
              </div>
            </div>
          ) : (
            <main className="flex-grow">
              {children}
            </main>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
