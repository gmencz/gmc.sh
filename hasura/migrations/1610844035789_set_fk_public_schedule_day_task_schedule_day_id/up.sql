alter table "public"."schedule_day_task"
           add constraint "schedule_day_task_schedule_day_id_fkey"
           foreign key ("schedule_day_id")
           references "public"."schedule_day"
           ("id") on update restrict on delete cascade;
