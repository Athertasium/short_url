
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { SessionProvider } from "next-auth/react";
import SessionWrapper from "./components/SessionWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Short URL",
  description: "Shorten your URL with just a Click!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
        <SessionWrapper>
          <Navbar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
