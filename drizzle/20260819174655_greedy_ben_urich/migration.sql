ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;