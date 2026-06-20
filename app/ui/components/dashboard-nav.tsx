"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./sign_out_button";

export default function DashboardNav() {
  const pathname = usePathname();
  //   console.log(pathname);
  // Use the pathname to add conditional highlighting for active links
  return (
    <nav>
      <ul>
        <li>
          <Link href={"/dashboard/discover"}>Discover</Link>
        </li>
        <li>
          <Link href={"/dashboard/profile"}>Profile</Link>
        </li>
        <li>
          <Link href={"/dashboard/saved"}>Saved</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
