import { Staff, User } from "@/db/types/index.types";

export type FullUser = User & {
  staff: Staff | null;
};
