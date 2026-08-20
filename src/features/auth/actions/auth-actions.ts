"use server";

import { notLoggedAction } from "@/shared/lib/actions";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
  ResetPasswordInput,
  resetPasswordSchema,
  SignInInput,
  signInSchema,
  SignUpInput,
  signUpSchema,
} from "../schemes/auth-schemes";
import { AppError } from "@/shared/lib/errors";
import { authService } from "../services/auth-service";

export const signUpAction = notLoggedAction(async (data: SignUpInput) => {
  const zodResponse = signUpSchema.safeParse(data);
  if (!zodResponse.success) throw new AppError("Invalid data");

  await authService.signUp(zodResponse.data);

  return "User created successfully, please check your email to verify your account.";
});

export const signInAction = notLoggedAction(async (data: SignInInput) => {
  const zodResponse = signInSchema.safeParse(data);
  if (!zodResponse.success) throw new AppError("Invalid data");

  await authService.signIn(zodResponse.data);

  return {
    message: "Sign in successful, redirecting to dashboard...",
    data: {
      success: true,
    },
  };
});

export const forgotPasswordAction = notLoggedAction(
  async (data: ForgotPasswordInput) => {
    const zodResponse = forgotPasswordSchema.safeParse(data);
    if (!zodResponse.success) throw new AppError("Invalid data");

    await authService.forgotPassword(zodResponse.data);

    return "Email sent successfully, please check your email to reset your password.";
  },
);

export const resetPasswordAction = notLoggedAction(
  async ({ token, data }: { token: string; data: ResetPasswordInput }) => {
    const zodResponse = resetPasswordSchema.safeParse(data);
    if (!zodResponse.success) throw new AppError("Invalid data");

    await authService.resetPassword(token, zodResponse.data);

    return {
      message:
        "Password reset successfully, please sign in with your new password.",
      data: {
        success: true,
      },
    };
  },
);
