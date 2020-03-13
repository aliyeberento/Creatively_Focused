-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- You will need to create a database called "creatively-focused" in which you create the following tables.

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"firstname" varchar(100),
	"lastname" varchar(100),
	"phone" varchar(15),
	"isd" int,
	"school" int,
	"auth" int NOT NULL,
	"prefcomm" BOOLEAN,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "student" (
	"id" serial NOT NULL,
	"firstname" varchar(100) NOT NULL,
	"lastname" varchar(100) NOT NULL,
	"birthdate" DATE,
	"grade" int,
	"student_id" int,
	"disability_cat" int,
	"fed_setting" int,
	"initial_iep" DATE,
	"prev_iep" DATE,
	"next_iep" DATE,
	"prev_eval" DATE,
	"next_eval" DATE,
	"teacher" int,
	"school_id" int,
	"isd_id" int,
	"notes" TEXT,
	CONSTRAINT "student_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "school" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"isd_id" int NOT NULL,
	CONSTRAINT "school_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "isd" (
	"id" serial NOT NULL,
	"isd" int NOT NULL,
	"city" varchar(100),
	"state" varchar(50),
	CONSTRAINT "isd_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "case_worker" (
	"student_id" int(10) NOT NULL,
	"user_id" int(10) NOT NULL,
	CONSTRAINT "case_worker_pk" PRIMARY KEY ("student_id","user_id")
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
	"id" serial NOT NULL,
	"student_id" int NOT NULL,
	"event_id" int NOT NULL,
	"due_date" DATE NOT NULL,
	"notes" TEXT,
	"completed" BOOLEAN NOT NULL DEFAULT 'false',
	"date_completed" TIMESTAMP,
	"completed_by" int NOT NULL,
	CONSTRAINT "student_event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "calendar" (
	"id" serial NOT NULL,
	"date" serial NOT NULL,
	"school_id" int NOT NULL,
	"school_day" BOOLEAN NOT NULL DEFAULT true,
	"creator" serial NOT NULL,
	CONSTRAINT "calendar_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("isd") REFERENCES "isd"("id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk1" FOREIGN KEY ("school") REFERENCES "school"("id");

ALTER TABLE "student" ADD CONSTRAINT "student_fk0" FOREIGN KEY ("teacher") REFERENCES "user"("id");
ALTER TABLE "student" ADD CONSTRAINT "student_fk1" FOREIGN KEY ("school_id") REFERENCES "school"("id");
ALTER TABLE "student" ADD CONSTRAINT "student_fk2" FOREIGN KEY ("isd_id") REFERENCES "isd"("id");

ALTER TABLE "school" ADD CONSTRAINT "school_fk0" FOREIGN KEY ("isd_id") REFERENCES "isd"("id");

ALTER TABLE "case_worker" ADD CONSTRAINT "case_worker_fk0" FOREIGN KEY ("student_id") REFERENCES "student"("id");
ALTER TABLE "case_worker" ADD CONSTRAINT "case_worker_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "student_event" ADD CONSTRAINT "student_event_fk0" FOREIGN KEY ("student_id") REFERENCES "student"("id");
ALTER TABLE "student_event" ADD CONSTRAINT "student_event_fk1" FOREIGN KEY ("event_id") REFERENCES "event"("id");
ALTER TABLE "student_event" ADD CONSTRAINT "student_event_fk2" FOREIGN KEY ("completed_by") REFERENCES "user"("id");

ALTER TABLE "calendar" ADD CONSTRAINT "calendar_fk0" FOREIGN KEY ("school_id") REFERENCES "school"("id");
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_fk1" FOREIGN KEY ("creator") REFERENCES "user"("id");

-- serially generates every day in a school year
INSERT INTO "calendar" ("date", "creator")
SELECT generate_series('2020-09-08'::DATE, '2021-06-10', '1 day'), '1';

-- returns a specific student's first and last initials and grade number as studentinitials
SELECT CONCAT(
LEFT("firstname", 1),
LEFT("lastname", 1),
"grade") "studentinitals"
FROM "student"
WHERE id=1;

INSERT INTO "student"("firstname", "lastname", "birthdate", "grade", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "notes") VALUES('Luke', 'Rohde', '1981-02-17', 12, 3, 5, '2009-01-01', '2020-01-01', '2021-01-01', '2020-12-02', '2021-12-02', 'note about luke');

DROP TABLE "user";
DROP TABLE "student";
DROP TABLE "event";
DROP TABLE "student_event";
DROP TABLE "school";
DROP TABLE "isd";
DROP TABLE "case_worker";
DROP TABLE "calendar";