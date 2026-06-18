CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid,
	"service_id" uuid,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar,
	"date" varchar NOT NULL,
	"time" varchar NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_fr" varchar NOT NULL,
	"name_en" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title_fr" varchar NOT NULL,
	"title_en" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"excerpt_fr" text NOT NULL,
	"excerpt_en" text NOT NULL,
	"content_fr" text NOT NULL,
	"content_en" text NOT NULL,
	"image_url" varchar,
	"category_id" uuid,
	"author" varchar NOT NULL,
	"status" varchar NOT NULL,
	"reading_time" integer,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar,
	"country" varchar,
	"status" varchar NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "destinations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_fr" varchar NOT NULL,
	"name_en" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"flag_emoji" varchar NOT NULL,
	"image_url" varchar,
	"description_fr" text NOT NULL,
	"description_en" text NOT NULL,
	"visa_duration" varchar,
	"requirements" jsonb,
	"featured" boolean,
	"continent" varchar,
	"order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faq" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_fr" varchar NOT NULL,
	"question_en" varchar NOT NULL,
	"answer_fr" text NOT NULL,
	"answer_en" text NOT NULL,
	"order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar,
	"country" varchar,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title_fr" varchar NOT NULL,
	"title_en" varchar NOT NULL,
	"description_fr" text NOT NULL,
	"description_en" text NOT NULL,
	"icon" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"benefits" jsonb,
	"process" jsonb,
	"price" varchar,
	"duration" varchar,
	"featured" boolean,
	"order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"role" varchar,
	"content" text NOT NULL,
	"image_url" varchar,
	"rating" varchar,
	"featured" boolean DEFAULT false,
	"order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
