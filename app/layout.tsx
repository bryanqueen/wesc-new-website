import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import {Space_Grotesk} from "next/font/google"
import "./globals.css";
import { Navbar } from "./components/navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

export const metadata: Metadata = {
  title: "WESC - World Education Service Centre",
  description: "Leading technology driven education service provider and Overseas Education Consultant",
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
      </body>
    </html>
  );
}
