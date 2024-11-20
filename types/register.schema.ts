import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Please add a name with at least 4 characters' }),
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
});
