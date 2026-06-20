import Image from "next/image";
import Link from "next/link";
import GoogleButton from "@/app/ui/components/google-button";
import SignInForm from "@/app/ui/components/sign-in-form";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <h2>Sign in to your account</h2>
      <GoogleButton />
      <Suspense>
        <SignInForm />
      </Suspense>
      <p>
        Don't have an account? <Link href={`/get_started/`}>Create one</Link>
      </p>
    </>
  );
}
