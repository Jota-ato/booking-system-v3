import {
  pgTable,
  uuid,
  smallint,
  text,
  index,
  unique,
  integer,
} from "drizzle-orm/pg-core";
import { appointments } from "./appointments";
import { services } from "./services";

export const appointmentServices = pgTable(
  "appointment_services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    appointmentId: uuid("appointment_id")
      .notNull()
      .references(() => appointments.id, {
        onDelete: "cascade",
      }),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, {
        onDelete: "restrict",
      }),
    quantity: smallint("quantity").default(1).notNull(),
    servicePriceSnapshot: integer("service_price_snapshot").notNull(),
    serviceDurationSnapshot: smallint("service_duration_snapshot").notNull(),
    serviceNameSnapshot: text("service_name_snapshot").notNull(),
  },
  (t) => [
    unique("appointment_service_unique").on(t.appointmentId, t.serviceId),
    index("appointment_services_appointmentId_idx").on(t.appointmentId),
    index("appointment_services_serviceId_idx").on(t.serviceId),
  ],
);
