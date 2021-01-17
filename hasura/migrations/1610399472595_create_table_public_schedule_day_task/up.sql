CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."schedule_day_task"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "start_time" timetz NOT NULL, "description" text NOT NULL, PRIMARY KEY ("id") ); COMMENT ON TABLE "public"."schedule_day_task" IS E'Tasks for the days of a schedule';
