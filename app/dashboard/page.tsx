import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;
  console.log(session?.user);

  return (
    <>
      <h1>Dashboard Page</h1>
      <p>If you're seeing me authentication succeeded</p>
      <p>userID: {userId}</p>
    </>
  );
}
