"use client";

import { Inter } from "next/font/google";
import { AuthProvider } from "./context/auth";
import { ApiProvider } from "./context/api";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApiProvider>
          <AuthProvider>{children}</AuthProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
