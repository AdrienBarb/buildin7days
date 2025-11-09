import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
