"use server";

import { User } from "@/db/types/index.types";
import { staffAction } from "@/shared/lib/actions";
import { UpdateUserInput, updateUserSchema } from "../schemes/user-schemes";
import { AppError } from "@/shared/lib/errors";
import { usersService } from "../services/users-service";

/**
 * Lets a staff member update their own profile, including requesting an
 * email change. `staffAction` resolves and injects the authenticated
 * `User` and enforces staff-level access.
 * @remarks `image` skips `userSchema` and is merged back in after validation, assuming it's already validated by a prior upload step.
 * @param data Form input: fields covered by `userSchema` plus an optional `image` from a prior upload.
 * @param user Current authenticated staff user, injected by `staffAction`.
 * @returns Confirmation message; wording differs if an email change was requested.
 * @throws {AppError} If `data` (excluding `image`) fails validation.
 */
export const updateSelfDataAction = staffAction(
  async (data: UpdateUserInput, user: User) => {
    const zodResponse = updateUserSchema.safeParse(data);

    if (!zodResponse.success) {
      throw new AppError("Invalid data");
    }

    await usersService.updateSelfData({ ...zodResponse.data }, user);
    const changedEmail: boolean =
      zodResponse.data.email !== undefined &&
      zodResponse.data.email !== user.email;

    return {
      message: changedEmail
        ? "Profile updated. Please check your email to confirm the change."
        : "Profile updated.",
      success: true,
      changedImage: data.image !== user.image,
    };
  },
);
