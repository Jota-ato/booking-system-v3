import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { staff } from "./staff";

export const staffInvitations = pgTable("staff_invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  staffId: uuid("staff_id")
    .notNull()
    .references(() => staff.id, {
      onDelete: "restrict",
    }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
