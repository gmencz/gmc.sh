alter table "public"."schedule" add constraint "schedule_title_length_check" check (char_length(title) <= 255);
