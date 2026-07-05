CREATE TABLE "campaigns" (
	"id" serial PRIMARY KEY,
	"slug" text NOT NULL UNIQUE,
	"category" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"origin" text NOT NULL,
	"unit_price" integer NOT NULL,
	"service_fee" integer NOT NULL,
	"moq" integer NOT NULL,
	"committed" integer DEFAULT 0 NOT NULL,
	"deadline" timestamp NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY,
	"campaign_id" integer NOT NULL,
	"name" text NOT NULL,
	"contact" text NOT NULL,
	"quantity" integer NOT NULL,
	"note" text DEFAULT '',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" serial PRIMARY KEY,
	"contact" text NOT NULL UNIQUE,
	"interest" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_campaign_id_campaigns_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id");