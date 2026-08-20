import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  uuid,
  timestamp,
  text,
  check,
  index,
} from "drizzle-orm/pg-core";
import { staff } from "./staff";

export const blockScope = pgEnum("block_scope", ["staff", "business"]);

export const blockTimes = pgTable(
  "block_times",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    scope: blockScope("scope").notNull().default("business"),
    staffId: uuid("staff_id").references(() => staff.id, {
      onDelete: "cascade",
    }),
    message: text("message"),
    startTime: timestamp("start_time", { mode: "date" }).notNull(),
    endTime: timestamp("end_time", { mode: "date" }).notNull(),
  },
  (t) => [
    index("block_times_staffId_idx").on(t.staffId, t.startTime),
    check("end_time_after_start_time", sql`${t.endTime} > ${t.startTime}`),
    check(
      "scope_staffId",
      sql`(${t.scope} == 'business' AND ${t.staffId} IS NULL) OR (${t.scope} == 'staff' AND ${t.staffId} IS NOT NULL)`,
    ),
  ],
);
