-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- You will need to create a database called "creatively-focused" in which you create the following tables.

CREATE TABLE "user" (
	"id" SERIAL NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"firstname" varchar(100),
	"lastname" varchar(100),
	"phone" varchar(15),
	"isd" int,
	"school" int,
	"auth" int,
	"prefcomm" BOOLEAN,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "student" (
	"id" SERIAL NOT NULL,
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
	"id" SERIAL NOT NULL,
	"name" varchar(100) NOT NULL,
	"isd_id" int NOT NULL,
	CONSTRAINT "school_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "isd" (
	"id" SERIAL NOT NULL,
	"isd" int NOT NULL,
	"city" varchar(100),
	"state" varchar(50),
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

CREATE TABLE "event" (
	"id" SERIAL NOT NULL,
	"task" varchar(255) NOT NULL,
	CONSTRAINT "event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "student_event" (
	"id" SERIAL NOT NULL,
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
	"id" SERIAL NOT NULL,
	"date" DATE NOT NULL,
	"school_id" int NOT NULL,
	"school_day" BOOLEAN NOT NULL DEFAULT 'true',
	"creator" INT NOT NULL,
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

INSERT INTO "isd"("isd", "city", "state") 
VALUES
(1, 'Farmington', 'MN'),
(2, 'Minneapolis', 'MN'),
(3, 'Saint Paul', 'MN');

INSERT INTO "school"("name", "isd_id") 
VALUES
('Highland Park', 3),
('Como', 3),
('Johnson', 3),
('North', 2),
('Patrick Henry', 2),
('South', 2);

INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Adam', 'Anderson', '2007-01-29', 8, 987149765, 0, 1, '2015-01-01', '2019-05-05', '2019-05-05', '2019-04-10', '2022-04-10', 5, 1, 1) ;
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Benjamin', 'Bennet', '2006-11-11', 9, 459812144, 1, 4, '2016-01-01', '2019-11-14', '2019-11-14', '2017-10-14', '2020-10-14', 6, 5, 3);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Clark', 'Carlson', '2003-04-14', 12, 987238761, 3, 4, '2018-01-01', '2019-01-03', '2020-01-03', '2018-12-12', '2021-12-12', 5, 3, 2);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Donna', 'Denning', '2004-03-03', 11, 135957363, 8, 2, '2017-01-01', '2019-01-25', '2020-01-25', '2018-01-03', '2021-01-03', 6, 4, 2);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Erica', 'Eldridge', '2004-02-21', 11, 645274839, 12, 5, '2018-01-01', '2020-05-20', '2021-05-20', '2019-04-28', '2021-05-20', 5, 6, 3);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Freddy', 'Fremont', '2007-04-07', 8, 294726789, 7, 1, '2016-01-01', '2019-05-13', '2020-05-13', '2019-04-13', '2022-04-13', 6, 6, 3);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Gerald', 'Gordon', '2003-09-23', 12, 235873844, 0, 2, '2018-01-01', '2019-04-11', '2020-04-11', '2019-03-14', '2020-04-11', 5, 2, 1);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Harriet', 'Hanley', '2005-04-02', 10, 895528427, 11, 2, '2019-01-01', '2019-03-01', '2020-03-01', '2019-02-02', '2020-03-01', 6, 6, 3);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Irene', 'Ianetta', '2006-11-18', 9, 817349273, 4, 4, '2018-01-01', '2020-02-01', '2021-02-01', '2020-01-04', '2021-02-01', 5, 4, 2);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Jessica', 'Johnson', '2005-10-12', 10, 292865290, 6, 5, '2016-01-01', '2019-03-11', '2020-03-11', '2018-02-10', '2020-03-11', 6, 5, 3);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Keri', 'Kay', '2003-05-05', 12, 287920857, 1, 1, '2017-01-01', '2020-02-22', '2021-02-22', '2020-01-27', '2021-02-22', 5, 5, 3);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Lisa', 'Lamont', '2004-07-15', 11, 987276623, 10, 3, '2019-01-01', '2020-05-22', '2021-05-22', '2020-02-22', '2021-02-22', 6, 1, 1);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Marie', 'Mehldau', '2006-08-17', 9, 928573757, 4, 2, '2016-01-01', '2019-09-10', '2020-09-10', '2019-04-12', '2022-04-12', 5, 3, 2);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Nicholas', 'Norrie', '2005-12-21', 10, 447733299, 2, 5, '2017-01-01', '2019-04-29', '2020-04-29', '2019-03-29', '2022-03-29', 6, 3, 2);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Olaf', 'O''Brien', '2007-08-09', 8, 298759337, 9, 1, '2018-01-01', '2020-02-04', '2021-02-04', '2020-01-08', '2023-01-08', 5, 4, 2);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Paul', 'Paulson', '2004-06-05', 11, 293728833, 6, 5, '2019-01-01', '2019-12-06', '2020-12-06', '2019-11-09', '2022-11-09', 6, 4, 2);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Quincy', 'Quentin', '2006-11-14', 9, 585775038, 8, 3, '2017-01-01', '2019-11-30', '2020-11-30', '2019-10-31', '2022-10-31', 5, 2, 1);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Robbie', 'Rolston', '2002-10-29', 12, 485992847, 13, 1, '2018-01-01', '2019-10-04', '2020-10-04', '2018-09-05', '2021-09-05', 6, 3, 2);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Sarah', 'Simpson', '2004-01-04', 11, 944949828, 5, 4, '2016-01-01', '2020-02-18', '2021-02-18', '2018-01-26', '2021-01-26', 5, 1, 1);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Thomas', 'Traynor', '2007-09-20', 8, 248884758, 2, 1, '2017-01-01', '2019-01-26', '2020-01-26', '2019-12-29', '2022-12-29', 6, 6, 3);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Uter', 'Ulow', '2005-08-08', 10, 492478562, 1, 5, '2014-01-01', '2019-10-22', '2020-10-22', '2018-09-24', '2021-09-24', 5, 5, 3);
INSERT INTO "public"."student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") VALUES('Victor', 'Vandalay', '2008-09-21', 7, 728229472, 7, 2, '2015-01-01', '2020-02-01', '2021-02-01', '2019-01-04', '2022-01-04', 6, 3, 2);
