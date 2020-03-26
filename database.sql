-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- You will need to create a database called "creatively-focused" in which you create the following tables.

CREATE TABLE "user" (
	"id" SERIAL,
	"username" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"firstname" VARCHAR(100),
	"lastname" VARCHAR(100),
	"phone" VARCHAR(15),
	-- SHOULD THIS BE isd_id?
	"isd" INT,
	"school" INT,
	"auth" INT,
	"prefcomm" BOOLEAN,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "student" (
	"id" SERIAL NOT NULL,
	"firstname" VARCHAR(100) NOT NULL,
	"lastname" VARCHAR(100) NOT NULL,
	"birthdate" DATE,
	"grade" INT,
	"student_id" INT,
	"disability_cat" INT,
	"fed_setting" INT,
	"initial_iep" DATE,
	"prev_iep" DATE,
	"next_iep" DATE,
	"prev_eval" DATE,
	"next_eval" DATE,
	"teacher" INT,
	"school_id" INT,
	"isd_id" INT,
	"notes" TEXT,
	CONSTRAINT "student_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "school" (
	"id" SERIAL NOT NULL,
	"name" VARCHAR(100),
	"isd_id" INT,
	CONSTRAINT "school_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "isd" (
	"id" SERIAL NOT NULL,
	"isd" INT,
	"city" VARCHAR(100),
	"state" VARCHAR(50),
	CONSTRAINT "isd_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "case_worker" (
	"student_id" INT NOT NULL,
	"user_id" INT NOT NULL,
	CONSTRAINT "case_worker_pk" PRIMARY KEY ("student_id","user_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "event" (
	"id" SERIAL NOT NULL,
	"task" VARCHAR(255) NOT NULL,
	CONSTRAINT "event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "student_event" (
	"id" SERIAL NOT NULL,
	"student_id" INT NOT NULL,
	"event_id" INT NOT NULL,
	"due_date" DATE,
	"notes" TEXT,
	"completed" BOOLEAN DEFAULT 'false',
	"date_completed" TIMESTAMP,
	"completed_by" INT,
	CONSTRAINT "student_event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "calendar" (
	"id" SERIAL NOT NULL,
	"date" DATE NOT NULL,
	"school_id" INT,
	"school_day" BOOLEAN DEFAULT 'true',
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

-- creates iep events
INSERT INTO "event" ("task") VALUES ('Notice of Team IEP Meeting'), ('Present Levels of Performance (IEP)'), ('Agenda and Reminder of IEP Meeting'), ('Print Final IEP Meeting Materials'), ('Annual IEP Meeting Deadline'), ('PWN and IEP Reminder'), ('Send PWN and IEP Due'), ('IEP Consent');

-- creates eval events

-- creates cf dates

-- creates a transfer of rights at age 17
INSERT INTO "event" ("task") VALUES ('Transfer of Rights');

-- serially generates every day in a school year at school id 6
INSERT INTO "calendar" ("date", "creator", "school_id")
SELECT generate_series('2020-09-08'::DATE, '2021-06-11', '1 day'), '6', '1';

-- turns non-school days to false
UPDATE "calendar" SET "school_day"=FALSE WHERE "id"=6 OR "id"=7 OR "id"=13 OR "id"=14 OR "id"=19 OR "id"=20 OR "id"=21 OR "id"=27 OR "id"=28 OR "id"=34 OR "id"=35 OR "id"=39 OR "id"=40 OR "id"=41 OR "id"=42 OR "id"=48 OR "id"=49 OR "id"=54 OR "id"=55 OR "id"=56 OR "id"=62 OR "id"=63 OR "id"=69 OR "id"=70 OR "id"=71 OR "id"=76 OR "id"=77 OR "id"=80 OR "id"=81 OR "id"=82 OR "id"=83 OR "id"=84 OR "id"=89 OR "id"=90 OR "id"=91 OR "id"=97 OR "id"=98 OR "id"=104 OR "id"=105 OR "id"=107 OR "id"=108 OR "id"=109 OR "id"=110 OR "id"=111 OR "id"=112 OR "id"=113 OR "id"=114 OR "id"=115 OR "id"=116 OR "id"=117 OR "id"=118 OR "id"=119 OR "id"=125 OR "id"=126 OR "id"=131 OR "id"=132 OR "id"=133 OR "id"=134 OR "id"=139 OR "id"=140 OR "id"=145 OR "id"=146 OR "id"=147 OR "id"=148 OR "id"=153 OR "id"=154 OR "id"=160 OR "id"=161 OR "id"=162 OR "id"=167 OR "id"=168 OR "id"=173 OR "id"=174 OR "id"=175 OR "id"=181 OR "id"=182 OR "id"=188 OR "id"=189 OR "id"=195 OR "id"=196 OR "id"=201 OR "id"=202 OR "id"=203 OR "id"=204 OR "id"=205 OR "id"=206 OR "id"=207 OR "id"=208 OR "id"=209 OR "id"=210 OR "id"=215 OR "id"=216 OR "id"=217 OR "id"=218 OR "id"=223 OR "id"=224 OR "id"=230 OR "id"=231 OR "id"=236 OR "id"=237 OR "id"=238 OR "id"=244 OR "id"=245 OR "id"=251 OR "id"=252 OR "id"=258 OR "id"=259 OR "id"=264 OR "id"=265 OR "id"=266 OR "id"=267 OR "id"=272 OR "id"=273;

-- returns a specific student's first and last initials and grade number as studentinitials
SELECT CONCAT(
LEFT("firstname", 1),
LEFT("lastname", 1),
"grade") "studentinitals"
FROM "student"
WHERE id=1;

-- updates the student's iep dates with a PUT onClick
UPDATE "student" SET
"prev_iep" = now(),
"next_iep" = now() + interval '1 year'
WHERE "id" = ???;

-- updates the student's eval dates with a PUT onClick
UPDATE "student" SET
"prev_eval" = now(),
"next_eval" = now() + interval '3 years'
WHERE "id" = ???;

-- gets all of a teacher's information, including school name and district number
SELECT "user".firstname, 
	"user".lastname, 
	"user".phone, 
	"isd".isd, 
	"school".name AS "school", 
	"isd".city, 
	"isd".state, 
	"user".auth
FROM "user"
LEFT JOIN "school" ON "school".id = "user".school
LEFT JOIN "isd" ON "isd".id = "user".isd
WHERE "user"."id" = ???;

-- gets all of the events for all of the students
SELECT "event".task, "student_event".due_date, "student".firstname, "student".lastname FROM "student"
JOIN "student_event" on "student_event".student_id = "student".id
JOIN "event" on "student_event".event_id = "event".id;

-- makes a bunch of events for a student
INSERT INTO "student_event"("student_id", "event_id", "due_date", "completed", "completed_by")
VALUES
(3, 1, '2020-03-24', FALSE, 1), 
(3, 2, '2020-03-24', FALSE, 1), 
(3, 3, '2020-03-24', FALSE, 1), 
(3, 4, '2020-03-24', FALSE, 1), 
(3, 5, '2020-03-24', FALSE, 1), 
(3, 6, '2020-03-24', FALSE, 1), 
(3, 7, '2020-03-24', FALSE, 1), 
(3, 8, '2020-03-24', FALSE, 1);

INSERT INTO "student"("firstname", "lastname", "birthdate", "grade", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "notes") VALUES('Luke', 'Rohde', '1981-02-17', 12, 3, 5, '2009-01-01', '2020-01-01', '2021-01-01', '2020-12-02', '2021-12-02', 'note about luke');

-- Drop Table commands
DROP TABLE "user";
DROP TABLE "student";
DROP TABLE "event";
DROP TABLE "student_event";
DROP TABLE "school";
DROP TABLE "isd";
DROP TABLE "case_worker";
DROP TABLE "calendar";

-- The following are SQL Queries that produced our sample data set
INSERT INTO "isd"("isd", "city", "state") 
VALUES
(1, 'Farmington', 'MN'),
(2, 'Minneapolis', 'MN'),
(3, 'Saint Paul', 'MN');

INSERT INTO "school"("name", "isd_id") 
VALUES
('Farmington Senior High', 1),
('Farmington Junior High', 1),
('Highland Park', 3),
('Como', 3),
('Johnson', 3),
('North', 2),
('Patrick Henry', 2),
('South', 2);

INSERT INTO "student"("firstname", "lastname", "birthdate", "grade", "student_id", "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval", "teacher", "school_id", "isd_id") 
VALUES('Adam', 'Anderson', '2007-01-29', 8, 987149765, 0, 1, '2015-01-01', '2019-05-05', '2019-05-05', '2019-04-10', '2022-04-10', 5, 1, 1) ;
('Benjamin', 'Bennet', '2006-11-11', 9, 459812144, 1, 4, '2016-01-01', '2019-11-14', '2019-11-14', '2017-10-14', '2020-10-14', 6, 5, 3),
('Clark', 'Carlson', '2003-04-14', 12, 987238761, 3, 4, '2018-01-01', '2019-01-03', '2020-01-03', '2018-12-12', '2021-12-12', 5, 3, 2),
('Donna', 'Denning', '2004-03-03', 11, 135957363, 8, 2, '2017-01-01', '2019-01-25', '2020-01-25', '2018-01-03', '2021-01-03', 6, 4, 2),
('Erica', 'Eldridge', '2004-02-21', 11, 645274839, 12, 5, '2018-01-01', '2020-05-20', '2021-05-20', '2019-04-28', '2021-05-20', 5, 6, 3),
('Freddy', 'Fremont', '2007-04-07', 8, 294726789, 7, 1, '2016-01-01', '2019-05-13', '2020-05-13', '2019-04-13', '2022-04-13', 6, 6, 3),
('Gerald', 'Gordon', '2003-09-23', 12, 235873844, 0, 2, '2018-01-01', '2019-04-11', '2020-04-11', '2019-03-14', '2020-04-11', 5, 2, 1),
('Harriet', 'Hanley', '2005-04-02', 10, 895528427, 11, 2, '2019-01-01', '2019-03-01', '2020-03-01', '2019-02-02', '2020-03-01', 6, 6, 3),
('Irene', 'Ianetta', '2006-11-18', 9, 817349273, 4, 4, '2018-01-01', '2020-02-01', '2021-02-01', '2020-01-04', '2021-02-01', 5, 4, 2),
('Jessica', 'Johnson', '2005-10-12', 10, 292865290, 6, 5, '2016-01-01', '2019-03-11', '2020-03-11', '2018-02-10', '2020-03-11', 6, 5, 3),
('Keri', 'Kay', '2003-05-05', 12, 287920857, 1, 1, '2017-01-01', '2020-02-22', '2021-02-22', '2020-01-27', '2021-02-22', 5, 5, 3),
('Lisa', 'Lamont', '2004-07-15', 11, 987276623, 10, 3, '2019-01-01', '2020-05-22', '2021-05-22', '2020-02-22', '2021-02-22', 6, 1, 1),
('Marie', 'Mehldau', '2006-08-17', 9, 928573757, 4, 2, '2016-01-01', '2019-09-10', '2020-09-10', '2019-04-12', '2022-04-12', 5, 3, 2),
('Nicholas', 'Norrie', '2005-12-21', 10, 447733299, 2, 5, '2017-01-01', '2019-04-29', '2020-04-29', '2019-03-29', '2022-03-29', 6, 3, 2),
('Olaf', 'O''Brien', '2007-08-09', 8, 298759337, 9, 1, '2018-01-01', '2020-02-04', '2021-02-04', '2020-01-08', '2023-01-08', 5, 4, 2),
('Paul', 'Paulson', '2004-06-05', 11, 293728833, 6, 5, '2019-01-01', '2019-12-06', '2020-12-06', '2019-11-09', '2022-11-09', 6, 4, 2),
('Quincy', 'Quentin', '2006-11-14', 9, 585775038, 8, 3, '2017-01-01', '2019-11-30', '2020-11-30', '2019-10-31', '2022-10-31', 5, 2, 1),
('Robbie', 'Rolston', '2002-10-29', 12, 485992847, 13, 1, '2018-01-01', '2019-10-04', '2020-10-04', '2018-09-05', '2021-09-05', 6, 3, 2),
('Sarah', 'Simpson', '2004-01-04', 11, 944949828, 5, 4, '2016-01-01', '2020-02-18', '2021-02-18', '2018-01-26', '2021-01-26', 5, 1, 1),
('Thomas', 'Traynor', '2007-09-20', 8, 248884758, 2, 1, '2017-01-01', '2019-01-26', '2020-01-26', '2019-12-29', '2022-12-29', 6, 6, 3),
('Uter', 'Ulow', '2005-08-08', 10, 492478562, 1, 5, '2014-01-01', '2019-10-22', '2020-10-22', '2018-09-24', '2021-09-24', 5, 5, 3),
('Victor', 'Vandalay', '2008-09-21', 7, 728229472, 7, 2, '2015-01-01', '2020-02-01', '2021-02-01', '2019-01-04', '2022-01-04', 6, 3, 2);

-- This Query creates the milestones associated with an IEP and Transfer of Rights
INSERT INTO "event" ("task") 
VALUES('Notice of Team IEP Meeting'),
('Present Levels of Performance (IEP)'),
('Agenda and Reminder of IEP Meeting'),
('Print Final IEP Meeting Materials'),
('Annual IEP Meeting Deadline'),
('PWN and IEP Reminder'),
('Send PWN and IEP Due'),
('IEP Consent'),
('Transfer of Rights');