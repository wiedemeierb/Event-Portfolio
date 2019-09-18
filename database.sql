
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user"
-- (
--   "id" serial NOT NULL,
--   "username" varchar(80) NOT NULL UNIQUE,
--   "password" varchar(255) NOT NULL,
--   "name" varchar(255) NOT NULL,
--   "phone_number" varchar(10) NOT NULL,
--   "payment_username" varchar(255),
--   CONSTRAINT "user_pk" PRIMARY KEY ("id")
-- )
-- WITH (
--   OIDS=FALSE
-- );

-- CREATE TABLE "user_event"
-- (
--   "id" serial NOT NULL,
--   "event_id" integer NOT NULL,
--   "user_id" integer NOT NULL,
--   CONSTRAINT "user_event_pk" PRIMARY KEY ("id")
-- )
-- WITH (
--   OIDS=FALSE
-- );

-- CREATE TABLE "event"
-- (
--   "id" serial NOT NULL,
--   "event_name" varchar(255) NOT NULL,
--   "location" varchar(255) NOT NULL,
--   "date" DATE NOT NULL,
--   "time" TIME NOT NULL,
--   "description" varchar(255) NOT NULL,
--   "user_id" integer NOT NULL,
--   CONSTRAINT "event_pk" PRIMARY KEY ("id")
-- )
-- WITH (
--   OIDS=FALSE
-- );

-- CREATE TABLE "items"
-- (
--   "id" serial NOT NULL,
--   "event_id" integer NOT NULL,
--   "user_id" integer NOT NULL,
--   "item" varchar(255) NOT NULL,
--   "cost" FLOAT(50) NOT NULL,
--   CONSTRAINT "items_pk" PRIMARY KEY ("id")
-- )
-- WITH (
--   OIDS=FALSE
-- );

-- ALTER TABLE "user_event" ADD CONSTRAINT "user_event_fk0" FOREIGN KEY ("event_id") REFERENCES "event"("id");
-- ALTER TABLE "user_event" ADD CONSTRAINT "user_event_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

-- ALTER TABLE "event" ADD CONSTRAINT "event_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

-- ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("event_id") REFERENCES "event"("id");
-- ALTER TABLE "items" ADD CONSTRAINT "items_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

CREATE TABLE event
(
  id SERIAL PRIMARY KEY,
  event_name character varying(255) NOT NULL,
  location character varying(255) NOT NULL,
  date date NOT NULL,
  time time
  without time zone NOT NULL,
    description character varying
  (255) NOT NULL,
    user_id integer REFERENCES user
  (id)
);

  -- Indices -------------------------------------------------------

  CREATE UNIQUE INDEX event_pk ON event(id
  int4_ops);

CREATE TABLE items
(
  id SERIAL PRIMARY KEY,
  event_id integer REFERENCES event(id),
  user_id integer REFERENCES user(id),
  item character varying(255) NOT NULL,
  cost double precision NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX items_pk ON items(id
int4_ops);

CREATE TABLE user
(
  id SERIAL PRIMARY KEY,
  username character varying(80) NOT NULL UNIQUE,
  password character varying(255) NOT NULL,
  name character varying(255) NOT NULL,
  phone_number character varying(10) NOT NULL,
  payment_username character varying(255)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX user_pk ON user(id
int4_ops);
CREATE UNIQUE INDEX user_username_key ON user(username
text_ops);

CREATE TABLE user_event
(
  id SERIAL PRIMARY KEY,
  event_id integer NOT NULL REFERENCES event(id) ON DELETE CASCADE,
  user_id integer REFERENCES user(id)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX user_event_pk ON user_event(id
int4_ops);
