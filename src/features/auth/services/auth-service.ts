import { auth } from "@/lib/auth";
import {
  ForgotPasswordInput,
  ResetPasswordInput,
  SignInInput,
  SignUpInput,
} from "../schemes/auth-schemes";
import { APIError } from "better-auth";
import { AppError } from "@/shared/lib/errors";

/**
 * AuthService class handles user authentication operations such as sign-up, sign-in, password reset, and error handling. It interacts with the authentication API and provides a consistent interface for managing user authentication in the application.
 *@method signup - Registers a new user with the provided sign-up data.
 *@method signin - Authenticates a user with the provided sign-in data.
 *@method forgotPassword - Initiates the password reset process for a user.
 *@method resetPassword - Resets the user's password using a provided token and new password.
 *@method handleErrorWrapper - Wraps API calls to handle errors consistently, throwing an AppError for known issues and logging unexpected errors.
 */
class AuthService {
  /**
   * Registers a new user with the provided sign-up data.
   * @param data User information needed to sign up, see @see {@link SignUpInput}
   */
  async signUp(data: SignUpInput) {
    await this.handleErrorWrapper(async () => {
      await auth.api.signUpEmail({
        body: {
          ...data,
          callbackURL: "/auth/sign-in",
        },
      });
    });
  }

  /**
   * Authenticates a user with the provided sign-in data.
   * @param data User email and password, @see {@link SignInInput}
   */
  async signIn(data: SignInInput) {
    await this.handleErrorWrapper(async () => {
      await auth.api.signInEmail({
        body: {
          ...data,
          callbackURL: "/dashboard",
        },
      });
    });
  }

  /**
   * Send an email to the user with a link to reset their password.
   * @param data Email of the user
   */
  async forgotPassword(data: ForgotPasswordInput) {
    await this.handleErrorWrapper(async () => {
      await auth.api.requestPasswordReset({
        body: {
          ...data,
          redirectTo: "/auth/reset-password",
        },
      });
    });
  }

  /**
   * Resets the user's password using a provided token and new password.
   * @param token Better-auth token, needed to validate the operation
   * @param data New password for the user, @see {@link ResetPasswordInput}
   */
  async resetPassword(
    token: string,
    { password: newPassword }: ResetPasswordInput,
  ) {
    await this.handleErrorWrapper(async () => {
      await auth.api.resetPassword({
        body: {
          token,
          newPassword,
        },
      });
    });
  }

  /**
   * Handles errors from API calls, throwing an AppError for known issues and logging unexpected errors.
   * @param fn Function that will wrapp
   * @returns Returns the expected return of the funciton passed
   */
  async handleErrorWrapper<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof APIError) {
        console.error(error.statusCode, error.cause);
        throw new AppError(error.message);
      }

      throw new AppError(
        "An unexpected error occurred. Please try again later.",
      );
    }
  }
}

/**
 * Singleton instance of {@link AuthService} for use throughout the application. This instance provides a consistent interface for managing user authentication and ensures that only one instance of the service is used.
 */
export const authService = new AuthService();
