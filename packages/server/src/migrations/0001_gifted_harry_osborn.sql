CREATE TABLE "borrows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"return_date" timestamp,
	"created_at" timestamp DEFAULT now()
);
