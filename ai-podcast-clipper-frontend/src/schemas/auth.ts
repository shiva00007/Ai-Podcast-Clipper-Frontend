import { z } from "zod";
export const signupSchema = z.object({
  email: z.string().email("Please Enter Valid Email Address"),
  passoword: z.string().min(8, "Password Must Have a 8 Charcters"),
});

export const loginSchema = z.object({
  email: z.string().email("Please Enter Valid Email Address"),
  passoword: z.string().min(1, "Password is Required"),
});
export type signupFormValues = z.infer<typeof signupSchema>;
export type loginFormValues = z.infer<typeof loginSchema>;
