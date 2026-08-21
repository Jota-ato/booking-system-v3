import { UpdateUser, User } from "@/db/types/index.types";
import { IUsersRepository, usersRepository } from "./users-repository";
import { AppError } from "@/shared/lib/errors";

/**
 * Orchestrates self-service profile updates, splitting email changes from
 * other profile fields.
 */
class UsersService {
  constructor(private usersRepository: IUsersRepository) {}

  /**
   * Updates the current user's profile. Non-email fields are applied
   * immediately. If `email` is present and different from the user's
   * current email, it goes through `changeEmail` instead of being written
   * directly.
   * @remarks If `updateSelfData` succeeds but `changeEmail` throws, profile fields are already saved while the email change never started — a partial-success case worth deciding how to handle.
   * @param data Fields to update, potentially including a new `email`.
   * @param user Current user, used to detect whether `email` actually changed.
   * @throws {Error} If either update fails.
   */
  async updateSelfData(
    { email, ...rest }: UpdateUser,
    user: User,
  ): Promise<void> {
    await this.usersRepository.updateSelfData(rest);

    if (email && email !== user.email) {
      try {
        await this.usersRepository.changeEmail(email);
      } catch (err) {
        throw new AppError(
          "Failed to change email, the rest of your profile was updated",
        );
      }
    }
  }
}

export const usersService = new UsersService(usersRepository);
