import { auth } from "@/lib/auth";
import {
  ForgotPasswordInput,
  ResetPasswordInput,
  SignInInput,
  SignUpInput,
} from "../schemes/auth-schemes";
import { APIError } from "better-auth";
import { AppError } from "@/shared/lib/errors";

class AuthService {
  async signUp(data: SignUpInput) {
    try {
      await auth.api.signUpEmail({
        body: {
          ...data,
          callbackURL: "/auth/sign-in",
        },
      });
    } catch (err) {
      if (err instanceof APIError) {
        console.log(err.statusCode, err.cause);
        throw new AppError(err.message);
      }

      throw new AppError(
        "An unexpected error occurred. Please try again later.",
      );
    }
  }

  async signIn(data: SignInInput) {
    try {
      await auth.api.signInEmail({
        body: {
          ...data,
          callbackURL: "/dashboard",
        },
      });
    } catch (err) {
      if (err instanceof APIError) {
        console.log(err.statusCode, err.cause);
        throw new AppError(err.message);
      }

      throw new AppError(
        "An unexpected error occurred. Please try again later.",
      );
    }
  }
  async forgotPassword(data: ForgotPasswordInput) {
    try {
      await auth.api.requestPasswordReset({
        body: {
          ...data,
          redirectTo: "/auth/reset-password",
        },
      });
    } catch (err) {
      if (err instanceof APIError) {
        console.log(err.statusCode, err.cause);
        throw new AppError(err.message);
      }

      throw new AppError(
        "An unexpected error occurred. Please try again later.",
      );
    }
  }

  async resetPassword(
    token: string,
    { password: newPassword }: ResetPasswordInput,
  ) {
    try {
      await auth.api.resetPassword({
        body: {
          token,
          newPassword,
        },
      });
    } catch (err) {
      if (err instanceof APIError) {
        console.log(err.statusCode, err.cause);
        throw new AppError(err.message);
      }

      throw new AppError(
        "An unexpected error occurred. Please try again later.",
      );
    }
  }
}

export const authService = new AuthService();
