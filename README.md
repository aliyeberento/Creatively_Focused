# Creatively Focused
Group Project for Prime Digital Academy

Client: Creatively Focused - Elizabeth Orme, Matthew Lasure, Becky Vavrichek

Group: Aliye Berento, Luke Rhodie, Paige Wielgos

Duration: 2 week sprint

This is a web application that helps teachers keep track of mandatory meetings for all of their students. The app will allow teachers to visually see their workload through a calendar and regulate scheduling conflicts. There will be set reminders for upcoming dates as well as alerts if a calendar month is too congested. This will allow teachers to be mindful of the amount of work they are doing and plan accordingly.

## Setup Instructions

Create a new database called `creatively-focused` and create a `user` table:

```SQL
CREATE TABLE "user" (
	"id" SERIAL,
	"username" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"firstname" VARCHAR(100),
	"lastname" VARCHAR(100),
	"phone" VARCHAR(15),
	"isd" INT,
	"school" INT,
	"auth" INT,
	"prefcomm" BOOLEAN,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
```

## Installation

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Repeat the same precedures for setting up a Twilio session in the `.env` file. You will need to make an account with Twilio to recieve a session password.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`


## Usage

* User - Teachers
    - Add students to their class
    - Edit student information
    - View all upcoming events
    - Add events and mettings for students

* Admin - Principals, District Managers, Other Staff
    - Add new users and other admins
    - View all events for their assigned teachers, school, etc

## Built With

* React
* Redux
* Node.js
* Express.js
* Passport
* PostgreSQL
* CSS
* Material-UI
* Nodemailer
* Twilio

## Challenges

* Learning new technologies

## Future Plans

* Admin usability

