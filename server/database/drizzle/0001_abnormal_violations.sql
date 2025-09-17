CREATE TYPE "public"."article_type" AS ENUM('Default', 'Character', 'Group');--> statement-breakpoint
ALTER TABLE "articles" RENAME COLUMN "content" TO "blocks";--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "type" "article_type" DEFAULT 'Default' NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "categories" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "tags" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "properties" jsonb NOT NULL;