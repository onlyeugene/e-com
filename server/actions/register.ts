"use server";

import bcrypt from "bcryptjs";

import { actionClient } from "@/lib/safe-action";
import { registerSchema } from "@/types/register.schema";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export const RegisterAccount = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const userPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      //   throw new Error("User already exists");
      return {
        error: "User already exists",
      };
    }

   await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: userPassword,
      },
    });

    revalidatePath("/");
    // return user;/
  });
