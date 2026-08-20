import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const staff = pgTable("staff", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  user_id: text("user_id").notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
