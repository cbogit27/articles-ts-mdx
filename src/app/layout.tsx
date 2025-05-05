import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import '@/styles/highlight-js/github-dark.css'
import {ViewTransitions} from 'next-view-transitions'
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: '%s | wildcardcal.pro',
    default: 'wildcardcal.pro'
  },
  description: "web development insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
      
        <Nav/>
        {children}
        
      </body>
    </html>
    </ViewTransitions>
      );
}
