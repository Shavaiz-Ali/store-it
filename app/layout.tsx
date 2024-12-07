import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import {
  poppinsBold,
  poppinsMedium,
  poppinsSemiBold,
  poppinsRegular,
} from "./fonts";
import { Suspense } from "react";
import Loader from "./loader";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Store it",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsBold.variable} ${poppinsSemiBold.variable} ${poppinsMedium.variable} ${poppinsRegular.variable}`}
      >
        <Suspense fallback={<Loader />}>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  );
}
