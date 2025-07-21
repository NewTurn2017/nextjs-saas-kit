import type { Metadata } from "next";
import config from "@/config";
import "./globals.css";
// Analytics imports removed - add them back when needed
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast';
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
          className="antialiased min-h-screen flex flex-col"
        >
          <Toaster position="top-center" />
          <main className="flex-grow">
            {children}
          </main>
          <FooterWrapper />
        </body>
      </SessionProvider>
      {/* Analytics components can be added here when needed */}
    </html>
  );
}
