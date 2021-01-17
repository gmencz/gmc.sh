ALTER TABLE "public"."schedule_day_task" ADD COLUMN "start_time" timetz;
ALTER TABLE "public"."schedule_day_task" ALTER COLUMN "start_time" DROP NOT NULL;
