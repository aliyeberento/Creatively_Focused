
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- You will need to create a database called "creatively-focused" in which you create the following tables.

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"phone" varchar(15),
	"isd" int,
	"school" int,
	"auth" varchar NOT NULL DEFAULT 3,
	"prefcomm" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "student" (
	"id" serial NOT NULL,
	"firstname" varchar(50) NOT NULL,
	"lastname" varchar(50) NOT NULL,
	"grade" varchar(2) NOT NULL,
	"id_number" varchar(13) NOT NULL,
	"prev_iep" DATE NOT NULL,
	"next_iep" DATE NOT NULL,
	"prev_eval" DATE NOT NULL,
	"next_eval" DATE NOT NULL,
	"disability" varchar(2) NOT NULL,
	"fed_setting" varchar(1) NOT NULL,
	"birthdate" DATE NOT NULL,
	"school_id" int,
	"isd_id" int,
	"notes" TEXT NOT NULL,
	"teacher" int NOT NULL,
	CONSTRAINT "student_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "event" (
	"id" serial NOT NULL,
	"task" varchar(255) NOT NULL,
	CONSTRAINT "event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "student_event" (
	"student_id" int NOT NULL,
	"event_id" int NOT NULL,
	"completed" BOOLEAN NOT NULL DEFAULT 'false',
	"date_due" DATE NOT NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "school" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "school_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "isd" (
	"id" serial NOT NULL,
	"isd" varchar(50) NOT NULL,
	"city" varchar(50) NOT NULL,
	"state" varchar(50) NOT NULL,
	CONSTRAINT "isd_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "case_worker" (
	"student_id" int NOT NULL,
	"user_id" int NOT NULL,
	CONSTRAINT "case_worker_pk" PRIMARY KEY ("student_id","user_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("isd") REFERENCES "isd"("id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk1" FOREIGN KEY ("school") REFERENCES "school"("id");

ALTER TABLE "student" ADD CONSTRAINT "student_fk0" FOREIGN KEY ("school_id") REFERENCES "school"("id");
ALTER TABLE "student" ADD CONSTRAINT "student_fk1" FOREIGN KEY ("isd_id") REFERENCES "isd"("id");
ALTER TABLE "student" ADD CONSTRAINT "student_fk2" FOREIGN KEY ("teacher") REFERENCES "user"("id");

ALTER TABLE "case_worker" ADD CONSTRAINT "case_worker_fk0" FOREIGN KEY ("student_id") REFERENCES "student"("id");
ALTER TABLE "case_worker" ADD CONSTRAINT "case_worker_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "student_event" ADD CONSTRAINT "student_event_fk0" FOREIGN KEY ("student_id") REFERENCES "student"("id");
ALTER TABLE "student_event" ADD CONSTRAINT "student_event_fk1" FOREIGN KEY ("event_id") REFERENCES "event"("id");

INSERT INTO "user" ("username", "password", "phone", "isd", "school", "auth", "prefcomm") 
VALUES ('dane_smith@sps.edu', '1234', '651-123-4567', 1, 1, 3, false);

INSERT INTO "school" ("name") 
VALUES ('Jefferson Middle School');

INSERT INTO "isd" ("isd", "city", "state") 
VALUES ('625', 'Saint Paul', 'Minnesota');

INSERT INTO "event" ("task") 
VALUES ('Annual IEP Meeting');

INSERT INTO "student" ("firstname", "lastname", "grade", "id_number", "prev_iep", "next_iep", "prev_eval", "next_eval", "disability", "fed_setting", "birthdate", "school_id", "isd_id", "notes", "teacher") 
VALUES ('Luke', 'Rohde', 9, 3247809967453, '2-12-2020', '3-12-2021', '1-12-2019', '1-12-2022', 5, 2, '2-26-2006', 1, 1, 'notes about Luke', 1),
('Paige', 'Wielgos', 8, 6748671239654, '11-1-2019', '11-1-2020', '10-1-2017', '10-1-2020', 4, 1, '9-27-2007', 1, 1, 'notes about Paige', 1),
('Ken', 'Slack', 7, 3332188904345, '11-15-2019', '11-15-2020', '12-1-2018', '10-1-2021', 3, 4, '3-5-2008', 1, 1, 'notes about Ken', 1),
('Aliye', 'Berento', 6, 9784438919022, '12-10-2019', '12-10-2020', '11-10-2019', '11-10-2021', 2, 2, '5-15-2009', 1, 1, 'notes about Aliye', 1);

INSERT INTO "student_event" ("student_id", "event_id", "completed", "date_due")
VALUES (2, 1, false, '11-1-2020');

INSERT INTO "case_worker" ("student_id", "user_id") 
VALUES(2, 1);

DROP TABLE "user";
DROP TABLE "student";
DROP TABLE "event";
DROP TABLE "student_event";
DROP TABLE "school";
DROP TABLE "isd";
DROP TABLE "case_worker";