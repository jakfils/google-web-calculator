import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Google Web Calculator",
  description:
    "Online calculator inspired by Google's web calculator: basic operations, scientific calculations, trigonometry, logarithms, and more. Try it for free!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${openSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
