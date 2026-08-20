CREATE TYPE "block_scope" AS ENUM('staff', 'business');--> statement-breakpoint
CREATE TABLE "block_times" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"scope" "block_scope" DEFAULT 'business'::"block_scope" NOT NULL,
	"staff_id" uuid,
	"message" text,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	CONSTRAINT "end_time_after_start_time" CHECK ("end_time" > "start_time"),
	CONSTRAINT "scope_staffId" CHECK (("scope" = 'business' AND "staff_id" IS NULL) OR ("scope" = 'staff' AND "staff_id" IS NOT NULL))
);
--> statement-breakpoint
CREATE INDEX "block_times_staffId_idx" ON "block_times" ("staff_id","start_time");--> statement-breakpoint
ALTER TABLE "block_times" ADD CONSTRAINT "block_times_staff_id_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE CASCADE;