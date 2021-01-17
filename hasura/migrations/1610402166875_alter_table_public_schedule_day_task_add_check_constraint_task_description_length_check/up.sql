alter table "public"."schedule_day_task" add constraint "task_description_length_check" check (char_length(description) <= 4096);
