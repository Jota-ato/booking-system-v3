import { db } from "@/db";
import { UpdateUser, User } from "@/db/types/index.types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * User data and credential mutations.
 * `updateSelfData` and `changeEmail` act on the session's own user (no id
 * needed). `adminUpdateUserData` is the only method that targets another
 * user by id.
 */
export interface IUsersRepository {
  /**
   * Updates the current user's profile fields (e.g. name, image).
   * Excludes email — use `changeEmail` for that.
   * @param data Fields to update.
   * @throws {Error} If the update is rejected (invalid session, validation failure).
   */
  updateSelfData(data: UpdateUser): Promise<void>;

  /**
   * Updates another user's data. Requires an admin session.
   * @param data Fields to update.
   * @param userId Target user's id.
   * @throws {Error} If the caller isn't an admin, the user doesn't exist, or the update is rejected.
   */
  adminUpdateUserData(data: UpdateUser, userId: string): Promise<void>;

  /**
   * Requests an email change for the current user. Doesn't update
   * immediately: sends a confirmation to the current email first, then a
   * verification link to the new one; the address changes once that's
   * clicked.
   * @param newEmail Requested new email.
   * @throws {Error} If the request is rejected (invalid session, email already in use).
   */
  changeEmail(newEmail: string): Promise<void>;

  getById(id: string): Promise<User | null>;
}

class UsersRepository implements IUsersRepository {
  /** @inheritdoc */
  async updateSelfData(data: UpdateUser): Promise<void> {
    await auth.api.updateUser({
      body: {
        ...data,
      },
      headers: await headers(),
    });
  }

  /** @inheritdoc */
  async adminUpdateUserData(data: UpdateUser, userId: string): Promise<void> {
    await auth.api.adminUpdateUser({
      body: {
        userId,
        data,
      },
      headers: await headers(),
    });
  }

  /**
   * @inheritdoc
   */
  async changeEmail(newEmail: string): Promise<void> {
    await auth.api.changeEmail({
      body: {
        newEmail,
        callbackURL: "/dashboard/settings",
      },
      headers: await headers(),
    });
  }

  async getById(id: string): Promise<User | null> {
    return (
      (await db.query.users.findFirst({
        where: { id },
        
      })) || null
    );
  }
}

export const usersRepository = new UsersRepository();
