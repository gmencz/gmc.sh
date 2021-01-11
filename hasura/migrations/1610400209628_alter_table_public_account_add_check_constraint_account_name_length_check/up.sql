alter table "public"."account" add constraint "account_name_length_check" check (char_length(name) <= 255);
