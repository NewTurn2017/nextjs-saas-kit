import type { Metadata } from "next";
import config from "@/config";
import "./globals.css";
// Analytics imports removed - add them back when needed
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner";
import FooterWrapper from "@/components/ui/FooterWrapper";

export const metadata: Metadata = config.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className="antialiased h-screen flex flex-col overflow-hidden"
        >
          <Toaster position="top-center" richColors />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <FooterWrapper />
        </body>
      </SessionProvider>
      {/* Analytics components can be added here when needed */}
    </html>
  );
}
