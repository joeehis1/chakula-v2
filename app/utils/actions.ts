"use server";
import * as z from "zod";

import { signIn, signOut } from "@/auth";
import { getUserByEmail } from "./query";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function logoutOfApplication() {
  await signOut({ redirectTo: "/get_started/login" });
}

export type State = {
  errors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
  };
  message?: string;
};

const signUpFormSchema = z
  .object({
    fullName: z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine(
    (data) => {
      const passwordsMatch = data.password === data.passwordConfirmation;
      return passwordsMatch;
    },
    { error: "Passwords are not matching.", path: ["passwordConfirmation"] },
  )
  .refine(
    async (data) => {
      const user = await getUserByEmail(data.email);
      return Boolean(user) === false;
    },
    { error: "User with email address", path: ["email"] },
  );

// export const loginFormSchema =

export async function createUserWithEmailAndPassword(
  prevState: State,
  formData: FormData,
) {
  // Get form Data
  const rawFormData = Object.fromEntries(formData);
  // console.log(rawFormData);
  const validatedFields = await signUpFormSchema.safeParseAsync(rawFormData);

  if (!validatedFields.success) {
    console.log("There are validation errors");

    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { fullName, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log()

  try {
    await prisma.user.create({
      data: {
        name: fullName,
        email,
        passwordHash: hashedPassword,
      },
    });
    console.log("user created successfully");
  } catch (error) {
    console.log("Database Error");
    return {
      message: "Internal Server Error. Try again later",
    };
  }

  console.log("Ready for the next phase");

  revalidatePath("/get_started");
  redirect("/get_started/login");

  // Validate form data
  // Save data to server
  // revalidateCache
  // Redirect to login page
}

export async function signInWithEmailAndPassword(
  state: string | undefined,
  formData: FormData,
) {
  try {
    // const formFields = {
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    // };
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        console.log("Authentication Error");
        return "Invalid Email or Password";
      } else {
        return "Something Went Wrong";
      }
    }
    throw error;
  }
}
