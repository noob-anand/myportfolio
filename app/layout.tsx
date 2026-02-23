import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anand Sharma | Full Stack Web Developer",
  description: "Portfolio of Anand Sharma, a Full Stack Web Developer with strong Data Structures & Algorithms expertise. Clean architecture, performance, and problem-solving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-scene" aria-hidden="true" />
        <div className="grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
