"use server";

import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "@/types/login-schema";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const LoginAccount = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser?.email !== email) {
        return {
          error: "User does not exist",
        };
      }

      //CHECK IF THE USER'S ACCOUNT IS APPROVED BY THE ADMIN
      // if(existingUser.isApproved){
      //     return {
      //         error: "Your account is not approved by the admin"
      //     }
      // }

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (existingUser.image === "no-image") {
        return redirect("/onboarding");
      } else {
        return redirect("/");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              error: "Invalid credentials",
            };
          case "AccessDenied":
            return {
              error: "You are not authorized to access this resource",
            };
        }
      }
      throw error;
    }
  });


  revalidatePath('/')
