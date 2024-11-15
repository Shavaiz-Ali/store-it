import { z } from "zod";

export type FormType = "login" | "register";

export const FormValidationSchema = (type: FormType) => {
  return z.object({
    email: z.string({ message: "invalid email" }).email(),
    password: z
      .string()
      .min(6, { message: "Password must be of atleast 6 characters" })
      .max(12),
    fullName:
      type === "register"
        ? z
            .string()
            .min(2, { message: "Full name must be of more than 2 characters" })
            .max(50)
        : z
            .string({ message: "Full name must be of more than 2 characters" })
            .optional(),
  });
};
