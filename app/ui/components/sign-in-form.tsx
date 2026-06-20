"use client";

import { signInWithEmailAndPassword } from "@/app/utils/actions";
import { useSearchParams } from "next/navigation";

import { useActionState } from "react";

export default function SignInForm() {
  const [state, formAction] = useActionState(
    signInWithEmailAndPassword,
    undefined,
  );
  const sp = useSearchParams();
  const cbUrl = sp.get("callbackUrl") || "/dashboard";

  return (
    <>
      <form action={formAction}>
        <div className="">
          <label htmlFor="">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>
        <input type="hidden" name="redirectTo" value={cbUrl} />
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button>Sign In To Your Account</button>
      </form>
    </>
  );
}
