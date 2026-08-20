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
    day: weekday("weekday").notNull(),
    startHour: time("start_time").notNull(),
    endHour: time("end_time").notNull(),
    restStartHour: time("rest_start_time"),
    restEndHour: time("rest_end_time"),
  },
  (t) => [
    unique("weekday_staffId_unique").on(t.day, t.staffId),
    check("start_time_before_end_time", sql`${t.startHour} < ${t.endHour}`),
    index("staff_schedules_staffId_idx").on(t.staffId),
  ],
);
