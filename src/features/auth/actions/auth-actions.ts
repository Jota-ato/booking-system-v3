"use server";

import { notLoggedAction } from "@/shared/lib/actions";
import { SignUpInput, signUpSchema } from "../schemes/auth-schemes";
import { AppError } from "@/shared/lib/errors";
import { authService } from "../services/auth-service";

export const signUpAction = notLoggedAction(async (data: SignUpInput) => {
  const zodResponse = signUpSchema.safeParse(data);
  if (!zodResponse.success) throw new AppError("Invalid data");

  await authService.signUp(data);

  return "User created successfully, please check your email to verify your account.";
});
