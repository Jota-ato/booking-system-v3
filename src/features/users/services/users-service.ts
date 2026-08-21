import { IUsersRepository, usersRepository } from "./users-repository";

class UsersService {
  constructor(private usersRepository: IUsersRepository) {}
}

export const usersService = new UsersService(usersRepository);
