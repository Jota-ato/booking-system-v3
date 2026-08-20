import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  notes: text("notes"),
  phone: text("phone").unique().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
