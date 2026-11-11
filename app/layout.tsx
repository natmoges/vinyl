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

const TITLE = "vinyl · Mars by Nat Moges";
const DESCRIPTION = "A record player for my track Mars, built in React + TypeScript.";

// A shared link shows the record's own artwork, and the page says where it lives.
export const metadata: Metadata = {
  metadataBase: new URL("https://vinyl-swart.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Nat Moges",
    type: "website",
    images: [{ url: "/art.jpeg", alt: "The artwork for Mars, my track on this record." }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/art.jpeg"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
