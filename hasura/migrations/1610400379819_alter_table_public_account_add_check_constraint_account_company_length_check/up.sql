alter table "public"."account" add constraint "account_company_length_check" check (char_length(company) <= 255);
