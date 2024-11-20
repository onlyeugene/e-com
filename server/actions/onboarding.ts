"use server";

import { actionClient } from "@/lib/safe-action";
import { onboardingSchema } from "@/types/onboarding-schema";
import { prisma } from "../prisma";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const Onboarding = actionClient
  .schema(onboardingSchema)
  .action(async ({ parsedInput: { location, image } }) => {
    const user = await auth();

    if (!user) {
      redirect("/login");
    }

    if(!image.trim()){
        return {
            error: 'Image is required'
        }
    }

    await prisma.user.update({
        where: {
           email: user.user?.email  as string
        },
        data: {
            image: image,
            location,
        }
    })

    revalidatePath('/onboarding')
  });
