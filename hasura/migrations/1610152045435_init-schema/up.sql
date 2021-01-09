CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    last_seen timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
