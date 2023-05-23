"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import { Dispatch, useState } from "react";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KAGAYAKI",
  description: "プレゼンテーション練習を支援するアプリケーション",
};

export const AppContext = React.createContext(
  {} as {
    count: number;
    setCount: Dispatch<React.SetStateAction<number>>;
    file: File | null;
    setFile: Dispatch<React.SetStateAction<File | null>>;
  }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  return (
    <html lang="ja">
      <head />
      <body className={inter.className}>
        <Header />
        <AppContext.Provider value={{ count, setCount, file, setFile }}>
          {children}
        </AppContext.Provider>
        <Footer />
      </body>
    </html>
  );
}
