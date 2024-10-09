alter table "auth"."users" drop constraint "unique_email";

drop index if exists "auth"."unique_email";

CREATE UNIQUE INDEX unique_user_email ON auth.users USING btree (email);

alter table "auth"."users" add constraint "unique_user_email" UNIQUE using index "unique_user_email";

create policy "Users can delete their own auth records"
on "auth"."users"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = id));


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER on_auth_user_updated AFTER UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_user_update();


create policy "allow authenticated users to select backgrounds lquh3y_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'focus_backgrounds'::text));


create policy "allow users to select files in bucket 1pfzk3o_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'white_noise'::text));



