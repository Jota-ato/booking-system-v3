import { User } from "@/db/types/index.types";

export class StaffPolicies {
  static isStaff(user: User): boolean {
    return user.role === "staff" || user.role === "admin";
  }
}
