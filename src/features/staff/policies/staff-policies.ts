import { User } from "@/db/types/index.types";

/**
 * StaffPolicies class provides utility methods to check user roles and permissions related to staff members.
 */
export class StaffPolicies {
  /**
   * A user is a staff member if their role is either "staff" or "admin".
   * @param user User that you want to validate.
   * @returns Wheter the user is a staff member.
   */
  static isStaff(user: User): boolean {
    return user.role === "staff" || user.role === "admin";
  }
}
