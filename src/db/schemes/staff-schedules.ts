import { sql } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  uuid,
  time,
  unique,
  check,
  index,
} from "drizzle-orm/pg-core";
import { staff } from "./staff";

export const weekday = pgEnum("weekday", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const staffSchedules = pgTable(
  "staff_schedules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    staffId: uuid("staff_id")
      .notNull()
      .references(() => staff.id, {
        onDelete: "cascade",
      }),
    weekday: weekday("weekday").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    restStartTime: time("rest_start_time"),
    restEndTime: time("rest_end_time"),
  },
  (t) => [
    unique("weekday_staffId_unique").on(t.weekday, t.staffId),
    check("start_time_before_end_time", sql`${t.startTime} < ${t.endTime}`),
    index("staff_schedules_staffId_idx").on(t.staffId),
  ],
);
