import type { Metadata } from "next";
import "@/app/globals.css";

import { epilogue } from "../ui/fonts";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chakula AI",
  description: "An AI Powered Recipe Generation Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.className}`}>
        <div>
          <div className="bg-image"></div>

          <header>
            <Link href={"/get_started"}>Recipe Intelligence</Link>
            <h1>Elevate your daily nutrition with AI</h1>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
