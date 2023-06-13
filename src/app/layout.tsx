import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import React from "react";
import { AppContextProvider } from "@/app/context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KAGAYAKI",
  description: "プレゼンテーション練習を支援するアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head />
      <body className={inter.className}>
        <Header />
        <AppContextProvider>{children}</AppContextProvider>
        <Footer />
      </body>
    </html>
  );
}
