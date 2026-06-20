import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
// import { loginFormSchema } from "./app/utils/actions";
import * as z from "zod";
import bcrypt from "bcrypt";

import { getUserByEmail } from "./app/utils/query";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = z
          .object({
            email: z.email(),
            password: z.string().min(6),
          })
          .safeParse({
            email: credentials.email,
            password: credentials.password,
          });

        if (validatedFields.success) {
          console.log("Validation Successful");
          console.log("Supposed to go to: ");
          console.log(credentials.redirectTo);
          const { email, password } = validatedFields.data;
          const foundUser = await getUserByEmail(email);
          if (!foundUser) return null;
          console.log("Found User");
          const passwordMatch = await bcrypt.compare(
            password,
            foundUser.passwordHash as string,
          );

          if (passwordMatch) {
            console.log("Returning User");
            return {
              id: foundUser.id,
              name: foundUser.name,
              email: foundUser.email,
            };
          }
        }
        console.log("Something went wrong while validating");
        return null;
      },
    }),
  ],
});
