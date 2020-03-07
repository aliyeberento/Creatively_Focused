
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- You will need to create a database called "creatively-focused" in which you create the following tables.

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"isd" int(5) NOT NULL,
	"school" int(5) NOT NULL,
	"auth" int(1) NOT NULL,
	"prefcomm" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "student" (
	"id" serial NOT NULL,
	"firstname" varchar(50) NOT NULL,
	"lastname" varchar(50) NOT NULL,
	"grade" int(2) NOT NULL,
	"id_number" int(13) NOT NULL,
	"prev_iep" DATE(15) NOT NULL,
	"next_iep" DATE(15) NOT NULL,
	"prev_eval" DATE(15) NOT NULL,
	"next_eval" DATE(15) NOT NULL,
	"disability" int(2) NOT NULL,
	"fed_setting" int(1) NOT NULL,
	"birthdate" DATE(15) NOT NULL,
	"school_id" int NOT NULL,
	"isd_id" int NOT NULL,
	"notes" TEXT NOT NULL,
	"teacher" varchar(255) NOT NULL,
	CONSTRAINT "student_pk" PRIMARY KEY ("id")
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
	"isd" int(50) NOT NULL,
	"city" varchar(50) NOT NULL,
	"state" varchar(50) NOT NULL,
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
	"due_date" DATE(15) NOT NULL,
	"completed" BOOLEAN NOT NULL DEFAULT 'false',
	"date_completed" DATE NOT NULL,
	"completed_by" int NOT NULL,
	CONSTRAINT "student_event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "calendar" (
	"id" serial NOT NULL,
	"date" serial NOT NULL,
	"school_day" serial NOT NULL DEFAULT 'true',
	"creator" serial NOT NULL DEFAULT 'true',
	CONSTRAINT "calendar_pk" PRIMARY KEY ("id")
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
ALTER TABLE "student_event" ADD CONSTRAINT "student_event_fk2" FOREIGN KEY ("completed_by") REFERENCES "user"("id");

ALTER TABLE "calendar" ADD CONSTRAINT "calendar_fk0" FOREIGN KEY ("creator") REFERENCES "user"("id");