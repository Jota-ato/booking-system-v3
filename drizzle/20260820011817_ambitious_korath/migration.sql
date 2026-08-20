CREATE TYPE "weekday" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');--> statement-breakpoint
CREATE TYPE "appointment_status" AS ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no_show');--> statement-breakpoint
CREATE TYPE "payment_status" AS ENUM('unpaid', 'paid', 'refunded');--> statement-breakpoint
CREATE TABLE "staff" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"user_id" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "staff_invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"staff_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "staff_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"staff_id" uuid NOT NULL,
	"weekday" "weekday" NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"rest_start_time" time,
	"rest_end_time" time,
	CONSTRAINT "weekday_staffId_unique" UNIQUE("weekday","staff_id"),
	CONSTRAINT "start_time_before_end_time" CHECK ("start_time" < "end_time")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"description" text,
	"duration" smallint NOT NULL,
	"price" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "duration_positove" CHECK ("duration" > 0),
	CONSTRAINT "price_positive" CHECK ("price" >= 0)
);
--> statement-breakpoint
CREATE TABLE "staff_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"staff_id" uuid NOT NULL,
	"service_id" uuid NOT NULL,
	CONSTRAINT "staffId_serviceId_unique" UNIQUE("staff_id","service_id")
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"notes" text,
	"phone" text NOT NULL UNIQUE,
	"is_active" boolean DEFAULT true NOT NULL,
	"email" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"staff_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"customer_name_snapshot" text NOT NULL,
	"notes" text,
	"status" "appointment_status" DEFAULT 'pending'::"appointment_status" NOT NULL,
	"payment_status" "payment_status" DEFAULT 'unpaid'::"payment_status" NOT NULL,
	"start_time" timestamp NOT NULL,
	"duration_minutes" smallint NOT NULL,
	"end_time" timestamp GENERATED ALWAYS AS ("appointments"."start_time" + make_interval(mins => "appointments"."duration_minutes")) STORED,
	"additional_price_cents" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cancelled_at" timestamp,
	CONSTRAINT "duration_positive" CHECK ("duration_minutes" > 0),
	CONSTRAINT "additional_price_non_negative" CHECK ("additional_price_cents" >= 0),
	CONSTRAINT "end_time_after_start_time" CHECK ("end_time" > "start_time")
);
--> statement-breakpoint
CREATE TABLE "appointment_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"appointment_id" uuid NOT NULL,
	"service_id" uuid NOT NULL,
	"quantity" smallint DEFAULT 1 NOT NULL,
	"service_price_snapshot" integer NOT NULL,
	"service_duration_snapshot" smallint NOT NULL,
	"service_name_snapshot" text NOT NULL,
	CONSTRAINT "appointment_service_unique" UNIQUE("appointment_id","service_id")
);
--> statement-breakpoint
CREATE INDEX "staff_schedules_staffId_idx" ON "staff_schedules" ("staff_id");--> statement-breakpoint
CREATE INDEX "appointments_staffId_idx" ON "appointments" ("staff_id","start_time");--> statement-breakpoint
CREATE INDEX "appointment_services_appointmentId_idx" ON "appointment_services" ("appointment_id");--> statement-breakpoint
CREATE INDEX "appointment_services_serviceId_idx" ON "appointment_services" ("service_id");--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "staff_invitations" ADD CONSTRAINT "staff_invitations_staff_id_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "staff_schedules" ADD CONSTRAINT "staff_schedules_staff_id_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "staff_services" ADD CONSTRAINT "staff_services_staff_id_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "staff_services" ADD CONSTRAINT "staff_services_service_id_services_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_staff_id_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customer_id_customers_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "appointment_services" ADD CONSTRAINT "appointment_services_appointment_id_appointments_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "appointment_services" ADD CONSTRAINT "appointment_services_service_id_services_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT;

-- No overlapping appointments for the same staff member
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "appointments"
ADD CONSTRAINT "no_overlapping_appointments"
EXCLUDE USING gist (
  "staff_id" WITH =,
  tsrange("start_time", "end_time") WITH &&
) WHERE ("status" NOT IN ('cancelled', 'no_show'));