import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import SessionWrapper from "@/app/components/auth/SessionWrapper"

export const metadata: Metadata = {
  title: "Games - By Cord Marston",
  description: "Games created in JavaScript (React / NextJS)",
};

const knight = localFont({ 
  src: '../public/fonts/KnightWarrior-w16n8.otf', 
  variable: "--font-knight" 
});

const blomberg = localFont({ 
  src: '../public/fonts/Blomberg-8MKKZ.otf', 
  variable: "--font-blomberg" 
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" className={`${knight.variable} ${blomberg.variable}`}>
        <body className="h-screen">{children}</body>
      </html>
    </SessionWrapper>
  );
}
