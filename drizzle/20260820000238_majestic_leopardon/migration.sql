CREATE TYPE "user_role" AS ENUM('admin', 'staff', 'pending');--> statement-breakpoint
ALTER TABLE "staff" ALTER COLUMN "role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "staff" ALTER COLUMN "role" SET DATA TYPE "user_role" USING "role"::"user_role";--> statement-breakpoint
ALTER TABLE "staff" ALTER COLUMN "role" SET DEFAULT 'pending'::"user_role";