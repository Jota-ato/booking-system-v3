import { User } from "@/db/types/index.types";

export class UserPolicies {
  static canEditProfile(user: User, targetUserId: string): boolean {
    return user.id === targetUserId || user.role === "admin";
  }
}
