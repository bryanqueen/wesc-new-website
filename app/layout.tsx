import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import {Space_Grotesk} from "next/font/google"
import "./globals.css";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { CookieConsent } from "@/components/ui/cookie-consent";


const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

export const metadata: Metadata = {
  title:{
    default:  "WESC - World Education Service Centre",
    template: "%s | WESC"
  },
  description: "Leading technology driven education service provider and Overseas Education Consultant",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.wescng.com",
    siteName: "WESC",
    images: [
      {
        url: "https://www.wescng.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "WESC - World Education Service Center"
      },
    ],
  },
  twitter:{
    card: "summary_large_image"
  },
  icons: {
    icon: [
      { url: "/favicon.ico"},
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"}
    ],
    apple: [{ url: "/apple-touch-icon.png"}]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={spaceGrotesk.className}
      >
        <Navbar/>
        {children}
        <Footer/>
        <CookieConsent/>
      </body>
    </html>
  );
}
