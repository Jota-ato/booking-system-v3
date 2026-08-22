"use server";

import { User } from "@/db/types/index.types";
import { staffAction } from "@/shared/lib/actions";
import { UpdateUserInput, updateUserSchema } from "../schemes/user-schemes";
import { AppError } from "@/shared/lib/errors";
import { usersService } from "../services/users-service";

/**
 * Updates the current user's profile fields (e.g. name, image).
 * @param data Fields to update. @see {@link UpdateUserInput}
 * @param user The current authenticated user.
 * @returns A confirmation message and information about the changes made.
 * @throws {AppError} If the update is rejected (invalid session, validation failure).
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
