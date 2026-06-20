import Link from "next/link";
import React from "react";
import DashboardNav from "../ui/components/dashboard-nav";

// const links = [{name: "discover", href:"./"}]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html>
        <body>
          <header>
            <Link href="/dashboard">Recipe Intelligence</Link>
          </header>
          <DashboardNav />
          {children}
        </body>
      </html>
    </>
  );
}
