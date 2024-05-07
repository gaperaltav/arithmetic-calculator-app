CREATE TABLE IF NOT EXISTS "operations" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" numeric,
	"created_date" date,
	"updated_date" date,
	"deleted_date" date
);
