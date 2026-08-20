import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  boolean,
  smallint,
  integer,
  check,
} from "drizzle-orm/pg-core";

export const services = pgTable(
  "services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    duration: smallint("duration").notNull(),
    price: integer("price").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
  },
  (t) => [
    check("duration_positove", sql`${t.duration} > 0`),
    check("price_positive", sql`${t.price} >= 0`),
  ],
);
