import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/state/provider";

const font = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Task Manager",
  description:
    "Task Manager created using Next.js, Typescript, Tailwind and Redux Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} h-screen w-screen overflow-hidden`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
