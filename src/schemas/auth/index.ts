import { z } from "zod";

export const AuthSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  accessCode: z
    .string()
    .min(6, "Access code must be at least 6 digits")
    .regex(/^\d+$/, "Access code must contain only numbers"),
});

export type AuthFormData = z.infer<typeof AuthSchema>;
