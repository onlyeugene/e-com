import { z } from 'zod'

export const teamSchema = z.object({
  email: z.string(),
  name: z.string().nullable().optional(),
  isAdmin: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  image: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
})
