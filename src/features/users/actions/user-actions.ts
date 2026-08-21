"use server";

import { User } from "@/db/types/index.types";
import { staffAction } from "@/shared/lib/actions";
import { UserInput, userSchema } from "../schemes/user-schemes";
import { AppError } from "@/shared/lib/errors";
import { usersService } from "../services/users-service";

export const updateSelfDataAction = staffAction(
  async (data: UserInput & { image?: string }, user: User) => {
    const { image, ...rest } = data;

    const zodResponse = userSchema.safeParse(rest);

    if (!zodResponse.success) {
      throw new AppError("Invalid data");
    }

    await usersService.updateSelfData({ ...zodResponse.data, image }, user);

    return zodResponse.data.email !== user.email
      ? "We sent an email to your current email address to confirm the change"
      : "User data updated successfully";
  },
);
