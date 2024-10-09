

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."Sex" AS ENUM (
    'Male',
    'Female'
);


ALTER TYPE "public"."Sex" OWNER TO "postgres";


CREATE TYPE "public"."affirmation_category" AS ENUM (
    'Allah',
    'Certainty',
    'Struggle',
    'Wisdom',
    'Punishment',
    'Reward'
);


ALTER TYPE "public"."affirmation_category" OWNER TO "postgres";


CREATE TYPE "public"."focus_type" AS ENUM (
    'stopwatch',
    'timer'
);


ALTER TYPE "public"."focus_type" OWNER TO "postgres";


CREATE TYPE "public"."friendship_status" AS ENUM (
    'pending',
    'accepted',
    'rejected',
    'blocked'
);


ALTER TYPE "public"."friendship_status" OWNER TO "postgres";


CREATE TYPE "public"."task_status" AS ENUM (
    'new',
    'active',
    'completed',
    'abandoned'
);


ALTER TYPE "public"."task_status" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_duration"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  NEW.duration := NEW.end_time - NEW.start_time;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."calculate_duration"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_user"() RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
BEGIN
  -- Verwijder gebruiker uit friendships, focus-sessions, profiles, etc.
  DELETE FROM friends WHERE user_id = auth.uid() OR friend_id = auth.uid();
  DELETE FROM focus_sessions WHERE user_id = auth.uid();
  DELETE FROM profiles WHERE id = auth.uid();
  DELETE FROM tasks WHERE created_by = auth.uid();
  
  -- Verwijder gebruiker uit de auth tabel
  DELETE FROM auth.users WHERE id = auth.uid();
  
  RETURN;
END;
$$;


ALTER FUNCTION "public"."delete_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (id, name, birthdate, sex)
  values (new.id, 
  new.raw_user_meta_data->>'name', 
  new.raw_user_meta_data->>'birthdate', 
  new.raw_user_meta_data->>'sex');
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_user_update"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  update public.profiles
  set 
    name = new.raw_user_meta_data->>'name',
    birthdate = new.raw_user_meta_data->>'birthdate',
    sex = new.raw_user_meta_data->>'sex'
  where id = new.id;
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_user_update"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_focus_times"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
BEGIN
  -- Update the user's focus times in the profiles table
  UPDATE profiles
  SET day_focus_time = COALESCE(day_focus_time, 0) + EXTRACT(epoch FROM NEW.duration),
      week_focus_time = COALESCE(week_focus_time, 0) + EXTRACT(epoch FROM NEW.duration),
      month_focus_time = COALESCE(month_focus_time, 0) + EXTRACT(epoch FROM NEW.duration)
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_focus_times"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."affirmations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "verse" "text" DEFAULT ''::"text" NOT NULL,
    "surah" "text" DEFAULT ''::"text",
    "category" "public"."affirmation_category" NOT NULL,
    "ayah" "text" DEFAULT ''::"text"
);


ALTER TABLE "public"."affirmations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."backgrounds" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "url" "text" DEFAULT ''::"text" NOT NULL,
    "category" "text" DEFAULT ''::"text" NOT NULL,
    "subcategory" "text" DEFAULT ''::"text",
    "description" "text" DEFAULT ''::"text"
);


ALTER TABLE "public"."backgrounds" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."focus_sessions" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "type" "public"."focus_type" DEFAULT 'timer'::"public"."focus_type" NOT NULL,
    "start_time" timestamp without time zone DEFAULT "now"() NOT NULL,
    "end_time" timestamp without time zone,
    "completed" boolean DEFAULT false,
    "duration" interval,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."focus_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."friends" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "friend_id" "uuid" NOT NULL,
    "status" "public"."friendship_status" DEFAULT 'pending'::"public"."friendship_status" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."friends" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "name" "text",
    "birthdate" "text",
    "sex" "text",
    "email" "text" DEFAULT ''::"text" NOT NULL,
    "day_focus_time" numeric DEFAULT 0 NOT NULL,
    "week_focus_time" numeric DEFAULT '0'::numeric NOT NULL,
    "month_focus_time" numeric DEFAULT '0'::numeric NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tasks" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"(),
    "title" "text" DEFAULT ''::"text",
    "description" "text" DEFAULT ''::"text",
    "focus_time" numeric,
    "status" "public"."task_status" DEFAULT 'new'::"public"."task_status" NOT NULL,
    "id" integer NOT NULL
);


ALTER TABLE "public"."tasks" OWNER TO "postgres";


ALTER TABLE "public"."tasks" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."tasks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."affirmations"
    ADD CONSTRAINT "affirmations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."backgrounds"
    ADD CONSTRAINT "backgrounds_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."focus_sessions"
    ADD CONSTRAINT "focus_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."friends"
    ADD CONSTRAINT "friends_pkey" PRIMARY KEY ("id");


ALTER TABLE auth.users ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");



CREATE OR REPLACE TRIGGER "focus_session_end_trigger" AFTER UPDATE OF "end_time" ON "public"."focus_sessions" FOR EACH ROW WHEN (("new"."end_time" IS NOT NULL)) EXECUTE FUNCTION "public"."update_focus_times"();



CREATE OR REPLACE TRIGGER "update_duration" BEFORE INSERT OR UPDATE ON "public"."focus_sessions" FOR EACH ROW WHEN (("new"."end_time" IS NOT NULL)) EXECUTE FUNCTION "public"."calculate_duration"();



ALTER TABLE ONLY "public"."focus_sessions"
    ADD CONSTRAINT "focus_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."friends"
    ADD CONSTRAINT "friends_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE;



ALTER TABLE ONLY "public"."friends"
    ADD CONSTRAINT "friends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_fkey" FOREIGN KEY ("email") REFERENCES "auth"."users"("email") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Allow authenticated users to delete their own tasks" ON "public"."tasks" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "created_by"));



CREATE POLICY "Allow authenticated users to insert focus sessions" ON "public"."focus_sessions" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Allow authenticated users to insert tasks" ON "public"."tasks" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Allow authenticated users to select focus sessions" ON "public"."focus_sessions" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to select their own tasks" ON "public"."tasks" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "created_by"));



CREATE POLICY "Allow authenticated users to update the status of their own tas" ON "public"."tasks" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "created_by")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "created_by"));



CREATE POLICY "Allow authenticated users to update their own focus sessions" ON "public"."focus_sessions" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Allow authenticated users to update their own tasks" ON "public"."tasks" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "created_by")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "created_by"));



CREATE POLICY "Authenticated users can insert profiles" ON "public"."profiles" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Authenticated users can select profiles" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can update their own profiles" ON "public"."profiles" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Enable read access for all users" ON "public"."affirmations" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."backgrounds" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Users can delete friendships" ON "public"."friends" FOR DELETE TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "user_id") OR (( SELECT "auth"."uid"() AS "uid") = "friend_id")));



CREATE POLICY "Users can delete their own friendships" ON "public"."friends" FOR DELETE TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "user_id") OR (( SELECT "auth"."uid"() AS "uid") = "friend_id")));



CREATE POLICY "Users can delete their own profiles" ON "public"."profiles" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can send friend requests" ON "public"."friends" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Users can update friendship status" ON "public"."friends" FOR UPDATE TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "user_id") OR (( SELECT "auth"."uid"() AS "uid") = "friend_id"))) WITH CHECK (((( SELECT "auth"."uid"() AS "uid") = "user_id") OR (( SELECT "auth"."uid"() AS "uid") = "friend_id")));



CREATE POLICY "Users can view their friends or be viewed by their friends" ON "public"."friends" FOR SELECT TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "user_id") OR (( SELECT "auth"."uid"() AS "uid") = "friend_id")));



ALTER TABLE "public"."affirmations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."backgrounds" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."focus_sessions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."friends" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tasks" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."focus_sessions";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."friends";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."profiles";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."calculate_duration"() TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_duration"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_duration"() TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_user_update"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_user_update"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_user_update"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_focus_times"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_focus_times"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_focus_times"() TO "service_role";


















GRANT ALL ON TABLE "public"."affirmations" TO "anon";
GRANT ALL ON TABLE "public"."affirmations" TO "authenticated";
GRANT ALL ON TABLE "public"."affirmations" TO "service_role";



GRANT ALL ON TABLE "public"."backgrounds" TO "anon";
GRANT ALL ON TABLE "public"."backgrounds" TO "authenticated";
GRANT ALL ON TABLE "public"."backgrounds" TO "service_role";



GRANT ALL ON TABLE "public"."focus_sessions" TO "anon";
GRANT ALL ON TABLE "public"."focus_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."focus_sessions" TO "service_role";



GRANT ALL ON TABLE "public"."friends" TO "anon";
GRANT ALL ON TABLE "public"."friends" TO "authenticated";
GRANT ALL ON TABLE "public"."friends" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."tasks" TO "anon";
GRANT ALL ON TABLE "public"."tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."tasks" TO "service_role";



GRANT ALL ON SEQUENCE "public"."tasks_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tasks_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tasks_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
