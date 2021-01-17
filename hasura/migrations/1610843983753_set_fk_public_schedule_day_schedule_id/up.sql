alter table "public"."schedule_day"
           add constraint "schedule_day_schedule_id_fkey"
           foreign key ("schedule_id")
           references "public"."schedule"
           ("id") on update restrict on delete cascade;
