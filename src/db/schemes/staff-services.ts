import { pgTable, uuid, unique } from "drizzle-orm/pg-core";
import { staff } from "./staff";
import { services } from "./services";

export const staffServices = pgTable(
  "staff_services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    staffId: uuid("staff_id")
      .notNull()
      .references(() => staff.id, {
        onDelete: "cascade",
      }),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, {
        onDelete: "restrict",
      }),
  },
  (t) => [unique("staffId_serviceId_unique").on(t.staffId, t.serviceId)],
);
