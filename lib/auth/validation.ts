import { z } from "zod";

export const emailSchema = z.string().trim().email("Enter a valid email address.").max(254);
export const passwordSchema = z
  .string()
  .min(12, "Use at least 12 characters.")
  .max(128, "Use no more than 128 characters.");
export const credentialsSchema = z
  .object({
    firstName: z.string().trim().min(1, "Enter your first name.").max(80),
    lastName: z.string().trim().min(1, "Enter your last name.").max(80),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });
export const contactSchema = z.object({
  country: z.string().trim().min(2, "Enter your country of residence.").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{7,14}$/, "Use international format, including + and country code."),
});
export const registrationSchema = credentialsSchema.and(contactSchema).and(
  z.object({
    terms: z.literal("on", { error: "Accept the Terms of Service." }),
    privacy: z.literal("on", { error: "Acknowledge the Privacy Policy." }),
    risk: z.literal("on", { error: "Acknowledge the Risk Disclosure." }),
  }),
);
export const resetSchema = z
  .object({ password: passwordSchema, confirmPassword: z.string() })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });
export type AuthState = { error?: string; success?: string; fields?: Record<string, string> };
export function validationState(error: z.ZodError): AuthState {
  return {
    error: "Please check the highlighted fields.",
    fields: Object.fromEntries(error.issues.map((i) => [String(i.path[0]), i.message])),
  };
}
