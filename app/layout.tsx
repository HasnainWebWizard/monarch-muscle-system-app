// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MetricsProvider } from "./context/MetricsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monarch Muscle System",
  description: "A fully adaptable, high-performance fitness tracking platform tailored to your specific biomechanics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <MetricsProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </MetricsProvider>
      </body>
    </html>
  );
}