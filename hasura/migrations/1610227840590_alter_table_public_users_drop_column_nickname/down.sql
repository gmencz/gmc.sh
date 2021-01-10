ALTER TABLE "public"."users" ADD COLUMN "nickname" text;
ALTER TABLE "public"."users" ALTER COLUMN "nickname" DROP NOT NULL;
