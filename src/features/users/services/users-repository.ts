import { UpdateUser } from "@/db/types/index.types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export interface IUsersRepository {
  updateSelfData(data: UpdateUser): Promise<void>;
  adminUpdateUserData(data: UpdateUser, userId: string): Promise<void>;
  changeEmail(newEmail: string): Promise<void>;
}

class UsersRepository implements IUsersRepository {
  async updateSelfData(data: UpdateUser): Promise<void> {
    await auth.api.updateUser({
      body: {
        ...data,
      },
      headers: await headers(),
    });
  }

  async adminUpdateUserData(data: UpdateUser, userId: string): Promise<void> {
    await auth.api.adminUpdateUser({
      body: {
        userId,
        data,
      },
      headers: await headers(),
    });
  }

  async changeEmail(newEmail: string): Promise<void> {
    await auth.api.changeEmail({
      body: {
        newEmail,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });
  }
}

export const usersRepository = new UsersRepository();
