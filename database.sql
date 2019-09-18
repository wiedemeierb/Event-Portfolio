
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
  "id" serial NOT NULL,
  "username" varchar(80) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL,
  "phone_number" varchar(10) NOT NULL,
  "payment_username" varchar(255),
  CONSTRAINT "user_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "user_event"
(
  "id" serial NOT NULL,
  "event_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  CONSTRAINT "user_event_pk" PRIMARY KEY ("id")
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

ALTER TABLE "user_event" ADD CONSTRAINT "user_event_fk0" FOREIGN KEY ("event_id") REFERENCES "event"("id");
ALTER TABLE "user_event" ADD CONSTRAINT "user_event_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "event" ADD CONSTRAINT "event_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("event_id") REFERENCES "event"("id");
ALTER TABLE "items" ADD CONSTRAINT "items_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");


