
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


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
