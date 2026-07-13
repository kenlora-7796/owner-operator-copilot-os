import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LoraOS | Tierra AI Labs",

  description:
    "LoraOS is the AI operating system for independent trucking businesses. Analyze routes, optimize profitability, manage finances, and automate operations with AI.",

  metadataBase: new URL("https://loraos.vercel.app"),

  applicationName: "LoraOS",

  authors: [
    {
      name: "Tierra AI Labs",
    },
  ],

  keywords: [
    "LoraOS",
    "Tierra AI Labs",
    "AI Trucking",
    "Owner Operator",
    "Fleet Management",
    "Route Optimization",
    "Profitability",
    "AI Dispatcher",
    "AI Bookkeeper",
  ],

  openGraph: {
    title: "LoraOS | AI Operating System for Trucking",
    description:
      "Analyze routes, increase profitability, and automate trucking operations with AI.",
    url: "https://loraos.vercel.app",
    siteName: "LoraOS",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LoraOS",
    description:
      "The AI Operating System for Independent Trucking Businesses.",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
