import { z } from "zod";

export const onboardingSchema = z.object({
  image: z.string(),
  location: z.string().min(2, { message: "Location is required" }),
});
