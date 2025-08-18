import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_JP } from "next/font/google";
import { Header } from "./components/layout/header";
import { LayoutWrapper } from "./components/layout-wrapper";

const noto_sans_jp = Noto_Sans_JP();

export const metadata: Metadata = {
  title: "Memo App",
  description: "Memo App by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${noto_sans_jp.className} antialiased`}>
        <LayoutWrapper>
          <header className="sticky top-0 z-20">
            <Header />
          </header>
          <main className="bg-gray-200">{children}</main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
