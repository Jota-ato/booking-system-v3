import { UpdateStaff } from "@/db/types/index.types";
import { IStaffRepository, staffRepository } from "./staff-repository";
import { UpdateStaffInput } from "../schemes/staff-schemes";

class StaffService {
  constructor(private staffRepository: IStaffRepository) {}

  async updateStaffInfo(id: string, data: UpdateStaffInput): Promise<void> {
    await this.staffRepository.update(id, { ...data });
  }

  async linkStaffToUser(staffId: string, userId: string): Promise<void> {
    const [staff] = await Promise.all([this.getStaffById(staffId)]);

    await this.staffRepository.update(staffId, { userId });
  }

  async getStaffById(id: string) {
    return await this.staffRepository.getById(id);
  }
}

export const staffService = new StaffService(staffRepository);
