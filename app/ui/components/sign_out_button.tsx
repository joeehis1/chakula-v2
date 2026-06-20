import { logoutOfApplication } from "@/app/utils/actions";

export default function SignOutButton() {
  return (
    <form action={logoutOfApplication}>
      <button>Sign Out</button>
    </form>
  );
}
