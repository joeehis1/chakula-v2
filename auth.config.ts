import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import prisma from "./lib/prisma";

export const authConfig = {
  pages: {
    signIn: "/get_started/login",
  },
  session: {
    strategy: "database",
  },

  callbacks: {
    session({ session, user }) {
      console.log("This is from the session callback");
      console.log(`Current session user: `);

      return session;
    },
    authorized(params) {
      console.log("Proxy hit");
      const { auth, request } = params;
      const isLoggedin = !!auth?.user;
      console.log("Is Logged In:");
      console.log(isLoggedin);

      const privateRoutes = ["/dashboard", "/register_user"];
      const pathname = request.nextUrl.pathname;

      const isOnPrivate = privateRoutes.includes(pathname);
      if (isOnPrivate) {
        if (isLoggedin) {
          console.log(auth.user);
          return true;
        }
        return false;
      } else if (isLoggedin) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [],
} satisfies NextAuthConfig;

/**
 * 
 * (property) authorized?: ((params: {
    request: NextRequest;
    auth: Session | null;
}) => Awaitable<boolean | NextResponse | Response | undefined>) | undefined

Invoked when a user needs authorization, using Middleware.

You can override this behavior by returning a NextResponse.



async authorized({ request, auth }) {
  const url = request.nextUrl

  if(request.method === "POST") {
    const { authToken } = (await request.json()) ?? {}
    // If the request has a valid auth token, it is authorized
    const valid = await validateAuthToken(authToken)
    if(valid) return true
    return NextResponse.json("Invalid auth token", { status: 401 })
  }

  // Logged in users are authenticated, otherwise redirect to login page
  return !!auth.user
}
:::warning If you are returning a redirect response, make sure that the page you are redirecting to is not protected by this callback, otherwise you could end up in an infinite redirect loop. :::



 */
