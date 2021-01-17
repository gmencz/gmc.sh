DROP TRIGGER IF EXISTS "set_public_account_updated_at" ON "public"."account";
ALTER TABLE "public"."account" DROP COLUMN "updated_at";
