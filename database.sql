
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "attendee"
(
    "id" serial NOT NULL,
    "name" varchar(255) NOT NULL,
    "phone_number" varchar(10) NOT NULL,
    "email_address" varchar(255) NOT NULL,
    "payment_username" varchar(255),
    "password" varchar(255) NOT NULL,
    CONSTRAINT "attendee_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "invite"
(
    "id" serial NOT NULL,
    "event_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    CONSTRAINT "invite_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "event"
(
    "id" serial NOT NULL,
    "event_name" varchar(255) NOT NULL,
    "location" varchar(255) NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    "description" varchar(255) NOT NULL,
    "user_id" integer NOT NULL,
    CONSTRAINT "event_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "items"
(
    "id" serial NOT NULL,
    "event_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "item" varchar(255) NOT NULL,
    "cost" FLOAT(50) NOT NULL,
    CONSTRAINT "items_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

ALTER TABLE "invite" ADD CONSTRAINT "invite_fk0" FOREIGN KEY ("event_id") REFERENCES "event"("id");
ALTER TABLE "invite" ADD CONSTRAINT "invite_fk1" FOREIGN KEY ("user_id") REFERENCES "attendee"("id");

ALTER TABLE "event" ADD CONSTRAINT "event_fk0" FOREIGN KEY ("user_id") REFERENCES "attendee"("id");

ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("event_id") REFERENCES "event"("id");
ALTER TABLE "items" ADD CONSTRAINT "items_fk1" FOREIGN KEY ("user_id") REFERENCES "attendee"("id");
