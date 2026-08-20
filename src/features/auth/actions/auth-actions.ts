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

/**
 * Action to sign up a new user.
 * @param data User information needed to sign up, see @see {@link SignUpInput}
 * @returns A success message if the user is created successfully.
 */
export const signUpAction = notLoggedAction(async (data: SignUpInput) => {
  const zodResponse = signUpSchema.safeParse(data);
  if (!zodResponse.success) throw new AppError("Invalid data");

  await authService.signUp(zodResponse.data);

  return "User created successfully, please check your email to verify your account.";
});

/**
 * Action to sign in an existing user.
 * @param data User email and password, @see {@link SignInInput}
 * @returns A success message and a success flag if the user is authenticated successfully.
 */
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

/**
 * Action to initiate the password reset process for a user.
 * @param data Email of the user, @see {@link ForgotPasswordInput}
 * @returns A success message if the password reset email is sent successfully.
 */
export const forgotPasswordAction = notLoggedAction(
  async (data: ForgotPasswordInput) => {
    const zodResponse = forgotPasswordSchema.safeParse(data);
    if (!zodResponse.success) throw new AppError("Invalid data");

    await authService.forgotPassword(zodResponse.data);

    return "Email sent successfully, please check your email to reset your password.";
  },
);

/**
 * Action to reset a user's password using a provided token and new password.
 * @param token Better-auth token, needed to validate the operation
 * @param data New password for the user, @see {@link ResetPasswordInput}
 * @returns A success message and a success flag if the password is reset successfully.
 */
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
