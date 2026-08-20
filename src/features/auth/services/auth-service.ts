import { auth } from "@/lib/auth";
import { SignUpInput } from "../schemes/auth-schemes";
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
}

export const authService = new AuthService();
