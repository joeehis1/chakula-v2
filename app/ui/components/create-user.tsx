"use client";

import { createUserWithEmailAndPassword, State } from "@/app/utils/actions";

import { useActionState } from "react";

export default function CreateUserForm() {
  const initialState: State = {};

  const [state, signUpAction, pending] = useActionState(
    createUserWithEmailAndPassword,
    initialState,
  );
  return (
    <form action={signUpAction}>
      <div className="">
        <label htmlFor="">Full Name</label>
        <input type="text" name="fullName" className={`border-2`} />
      </div>
      <div aria-live="polite" aria-atomic="true">
        {state.errors?.fullName?.map((error) => {
          return <p key={error}>{error}</p>;
        })}
      </div>
      <div className="">
        <label htmlFor="">Email Address</label>
        <input type="email" name="email" className={`border-2`} />
      </div>
      <div aria-live="polite" aria-atomic="true">
        {state.errors?.email?.map((error) => {
          return <p key={error}>{error}</p>;
        })}
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input className={`border-2`} type="password" name="password" id="" />
      </div>
      <div aria-live="polite" aria-atomic="true">
        {state.errors?.password?.map((error) => {
          return <p key={error}>{error}</p>;
        })}
      </div>
      <div>
        <label htmlFor="">Password Confirmation</label>
        <input
          className={`border-2`}
          type="password"
          name="passwordConfirmation"
          id=""
        />
      </div>
      <div aria-live="polite" aria-atomic="true">
        {state.errors?.passwordConfirmation?.map((error) => {
          return <p key={error}>{error}</p>;
        })}
      </div>
      <button className={`bg-green-300`}>Create Account</button>
    </form>
  );
}
