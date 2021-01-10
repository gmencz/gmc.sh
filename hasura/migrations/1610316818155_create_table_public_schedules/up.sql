CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."schedules"("title" text NOT NULL, "active" boolean NOT NULL DEFAULT true, "updated_at" timestamptz NOT NULL DEFAULT now(), "created_at" timestamptz NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_schedules_updated_at"
BEFORE UPDATE ON "public"."schedules"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_schedules_updated_at" ON "public"."schedules" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
