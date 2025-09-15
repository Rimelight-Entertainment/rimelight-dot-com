CREATE TYPE "public"."user_role" AS ENUM('user', 'employee');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(24),
	"last_name" varchar(24),
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"username" varchar(24) NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
