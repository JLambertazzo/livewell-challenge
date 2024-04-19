"use client";

import { DM_Sans } from "next/font/google";
import { AuthProvider } from "./context/auth";
import { ApiProvider } from "./context/api";

const dmsans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmsans.className}>
        <ApiProvider>
          <AuthProvider>{children}</AuthProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
