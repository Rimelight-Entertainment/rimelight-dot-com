ALTER TABLE "articles" ALTER COLUMN "tags" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "properties" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "blocks" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" DROP COLUMN "categories";