import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { relations } from "./relations";
import { DATABASE_URL } from "@/lib/env";

export const db = drizzle(DATABASE_URL!, { relations });
