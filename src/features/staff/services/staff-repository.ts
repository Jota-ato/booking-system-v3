import { db } from "@/db";
import { staff } from "@/db/schemes";
import { Staff, UpdateStaff } from "@/db/types/index.types";
import { eq } from "drizzle-orm";

export interface IStaffRepository {
  update(id: string, data: UpdateStaff): Promise<void>;
  getById(id: string): Promise<Staff | null>;
  getByUserId(userId: string): Promise<Staff | null>;
}

class StaffRepository implements IStaffRepository {
  async update(id: string, data: UpdateStaff): Promise<void> {
    await db.update(staff).set(data).where(eq(staff.id, id));
  }

  async getById(id: string): Promise<Staff | null> {
    return (
      (await db.query.staff.findFirst({
        where: { id },
      })) || null
    );
  }

  async getByUserId(userId: string): Promise<Staff | null> {
    return (
      (await db.query.staff.findFirst({
        where: { userId },
      })) || null
    );
  }
}

export const staffRepository = new StaffRepository();
