import { signInWithGoogle } from "@/app/utils/actions";

export default function GoogleButton() {
  return (
    <form action={signInWithGoogle}>
      <button className={`cursor-pointer`} type="submit">
        Google
      </button>
    </form>
  );
}
