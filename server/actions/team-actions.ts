"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { sendApprovalEmail, sendDeclineEmail } from "./email";
import { actionClient } from "@/lib/safe-action";
import { teamSchema } from "@/types/team-schema";

export const approveTeamMember = actionClient
  .schema(teamSchema)
  .action(async ({ parsedInput: { email, name } }) => {
    await prisma.user.update({
      where: { email: email },
      data: { isApproved: true, },
    });

    revalidatePath("/", "layout");
    await sendApprovalEmail(email, name);
    return;
  });

export const declineTeamMember = actionClient
  .schema(teamSchema)
  .action(async ({ parsedInput: { email, name } }) => {
    await prisma.user.delete({
      where: { email: email },
    });
    revalidatePath("/", "layout");
    await sendDeclineEmail(name!, email);
    return;
  });

export const updateTeamMember = actionClient
  .schema(teamSchema)
  .action(async ({ parsedInput: { email, isAdmin } }) => {
    await prisma.user.update({
      where: { email: email },
      data: { isAdmin: isAdmin },
    });
    revalidatePath("/", "layout");
    return;
  });

export const deleteTeamMember = actionClient
  .schema(teamSchema)
  .action(async ({ parsedInput: { email } }) => {
    await prisma.user.delete({
      where: { email: email },
    });
    revalidatePath("/", "layout");
    return;
  });
