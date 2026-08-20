import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  uuid,
  text,
  smallint,
  timestamp,
  check,
  index,
} from "drizzle-orm/pg-core";
import { staff } from "./staff";

export const appointmentStatus = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
  "paid",
]);

export const appointments = pgTable(
  "appointments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    staffId: uuid("staff_id")
      .notNull()
      .references(() => staff.id, {
        onDelete: "restrict",
      }),
    customerId: uuid("customer_id").notNull(),
    customerNameSnapshot: text("customer_name_snapshot").notNull(),
    notes: text("notes"),
    status: appointmentStatus("status").default("pending").notNull(),
    startTime: timestamp("start_time", { mode: "date" }).notNull(),
    durationMinutes: smallint("duration_minutes"),
    endTime: timestamp("end_time", { mode: "date" }).notNull(),
    additionalPriceCents: smallint("additional_price_cents")
      .default(0)
      .notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [
    index("appointments_staffId_idx").on(t.staffId, t.startTime),
    check("duration_positive", sql`${t.durationMinutes} > 0`),
    check("additional_price_non_negative", sql`${t.additionalPriceCents} >= 0`),
    check("end_time_after_start_time", sql`${t.endTime} > ${t.startTime}`),
    check(
      "race_condition",
      sql`(${t.staffId}, tstzrange(${t.startTime}, ${t.endTime})) status NOT IN ('cancelled', 'no_show')`,
    ),
  ],
);
