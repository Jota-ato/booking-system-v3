import z from "zod";

const validatePasswords = (data: {
  password: string;
  passwordConfirmation: string;
}) => data.password === data.passwordConfirmation;

const passwordConfirmationErrorMessage = {
  error: "Passwords do not match",
  path: ["passwordConfirmation"],
};

export const baseAuthSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required" })
    .max(50, { error: "Name must be less than 50 characters" }),
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(30, { error: "Password must be less than 30 characters" }),
  passwordConfirmation: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(30, { error: "Password must be less than 30 characters" }),
});

export const signUpSchema = baseAuthSchema
  .pick({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true,
  })
  .refine((data) => validatePasswords(data), passwordConfirmationErrorMessage);

export const signInSchema = baseAuthSchema.pick({
  email: true,
  password: true,
});

export const forgotPasswordSchema = baseAuthSchema.pick({
  email: true,
});

export const resetPasswordSchema = baseAuthSchema
  .pick({
    password: true,
    passwordConfirmation: true,
  })
  .refine((data) => validatePasswords(data), passwordConfirmationErrorMessage);

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
