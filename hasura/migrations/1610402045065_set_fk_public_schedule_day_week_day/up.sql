alter table "public"."schedule_day"
           add constraint "schedule_day_week_day_fkey"
           foreign key ("week_day")
           references "public"."schedule_day_week_day"
           ("day") on update restrict on delete restrict;
