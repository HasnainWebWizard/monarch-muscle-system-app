import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MetricsProvider } from "./context/MetricsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muscle Manifestation System",
  description: "Measure physical metrics inch by inch. A biomechanics archival platform.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon link if needed explicitly */}
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={`${inter.className} bg-black text-amber-50 antialiased`}>
        <MetricsProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </MetricsProvider>
      </body>
    </html>
  );
}