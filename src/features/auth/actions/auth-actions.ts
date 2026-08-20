"use server";

import { notLoggedAction } from "@/shared/lib/actions";
import { SignUpInput, signUpSchema } from "../schemes/auth-schemes";
import { AppError } from "@/shared/lib/errors";

export const signUp = notLoggedAction(async (data: SignUpInput) => {
  const zodResponse = signUpSchema.safeParse(data);
  if (!zodResponse.success) throw new AppError("Invalid data");

    
});
