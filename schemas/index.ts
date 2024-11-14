import { z } from "zod";

export type FormType = "login" | "register";

export const FormValidationSchema = (type: FormType) => {
  return z.object({
    email: z.string({ message: "invalid email" }).email(),
    fullName:
      type === "register"
        ? z
            .string({ message: "Full name must be of more than 2 characters" })
            .min(2)
            .max(50)
        : z.string().optional(),
  });
};
