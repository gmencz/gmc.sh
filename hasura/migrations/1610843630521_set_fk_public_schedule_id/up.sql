alter table "public"."schedule"
           add constraint "schedule_id_fkey"
           foreign key ("id")
           references "public"."schedule"
           ("id") on update restrict on delete cascade;
