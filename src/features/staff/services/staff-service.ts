import { UpdateStaff } from "@/db/types/index.types";
import { IStaffRepository, staffRepository } from "./staff-repository";
import { UpdateStaffInput } from "../schemes/staff-schemes";
import {
  IUsersRepository,
  usersRepository,
} from "@/features/users/services/users-repository";
import { AppError } from "@/shared/lib/errors";

class StaffService {
  constructor(
    private staffRepository: IStaffRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async updateStaffInfo({
    staffId,
    userId,
    data,
  }: {
    staffId: string;
    userId: string;
    data: UpdateStaffInput;
  }): Promise<void> {
    const staff = await this.staffRepository.getById(staffId);
    const user = await this.usersRepository.getById(userId, true);

    if (!staff) {
      throw new AppError("Staff member not found");
    }

    if (!user) {
      throw new AppError("User not found");
    }

    if (staff.userId !== user.id && user.role !== "admin") {
      throw new AppError("You are not authorized to update this staff member");
    }

    await this.staffRepository.update(staffId, { ...data });
  }

  async linkStaffToUser(staffId: string, userId: string): Promise<void> {
    const [staff, user] = await Promise.all([
      this.staffRepository.getById(staffId),
      this.usersRepository.getById(userId, true),
    ]);

    if (!user) {
      throw new AppError("User not found");
    }

    if (!staff) {
      throw new AppError("Staff member not found");
    }

    if (staff.userId) {
      throw new AppError("Staff member is already linked to a user");
    }

    if (user.staff !== null) {
      throw new AppError("User is already linked to a staff member");
    }

    await this.staffRepository.update(staffId, { userId });
  }
}

export const staffService = new StaffService(staffRepository, usersRepository);
