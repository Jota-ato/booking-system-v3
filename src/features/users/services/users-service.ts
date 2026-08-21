import { UpdateUser, User } from "@/db/types/index.types";
import { IUsersRepository, usersRepository } from "./users-repository";

class UsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async updateSelfData(
    { email, ...rest }: UpdateUser,
    user: User,
  ): Promise<void> {
    await this.usersRepository.updateSelfData(rest);

    if (email && email !== user.email) {
      await this.usersRepository.changeEmail(email);
    }
  }
}

export const usersService = new UsersService(usersRepository);
