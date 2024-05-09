CREATE TABLE IF NOT EXISTS "records" (
	"id" serial PRIMARY KEY NOT NULL,
	"operation_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"amount" double precision,
	"user_balance" double precision,
	"operation_response" double precision,
	"created_date" date,
	"updated_date" date,
	"deleted_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" text,
	"password" text,
	"status" smallint DEFAULT 1,
	"created_date" date,
	"updated_date" date,
	"deleted_date" date
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "records" ADD CONSTRAINT "records_operation_id_operations_id_fk" FOREIGN KEY ("operation_id") REFERENCES "operations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "records" ADD CONSTRAINT "records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
