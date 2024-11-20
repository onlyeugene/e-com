'use server'

import { auth } from "../auth"
import { prisma } from "../prisma"



export const getRoleStatus = async () => {
  const session = await auth()

  if (!session || !session?.user?.email) {
    throw new Error('No session or useer email found || Unauthorized ')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      isAdmin: true,
    },
  })

  return user?.isAdmin
}