import Image from "next/image";
import Link from "next/link";
import GoogleButton from "../ui/components/google-button";
import CreateUserForm from "../ui/components/create-user";

export default function Home() {
  return (
    <>
      <h2>Create your account</h2>

      <GoogleButton />
      <p>Or With Email</p>
      <CreateUserForm />
      <p>
        Already have an account?{" "}
        <Link href={`/get_started/login`}>Sign In</Link>
      </p>
    </>
  );
}
