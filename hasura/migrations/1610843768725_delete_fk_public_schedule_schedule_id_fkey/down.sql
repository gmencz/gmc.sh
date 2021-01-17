alter table "public"."schedule" add foreign key ("id") references "public"."schedule"("id") on update restrict on delete cascade;
