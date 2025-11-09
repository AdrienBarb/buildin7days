import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;

