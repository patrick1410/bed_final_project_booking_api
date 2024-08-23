# BED Final Project Starter

This repository contains starter code for the Bookings project.

## How to get started

You can clone the repo, install and run the app with the following commands:

```plaintext
npm install
npm run dev
```

## Starting the App

To start the app, follow these steps:

1. Create a `.env` file in the root directory.
2. Replace the values for `AUTH_SECRET_KEY` and `SENTRY_DSN` with your own values.

```plaintext
AUTH_SECRET_KEY=your_secret_key_here
SENTRY_DSN=your_sentry_dsn_here
```

## Running tests

Tests are created using Newman, a command-line tool that is able to automate execution of Postman-created tests. Therefore, this command will simulate more or less the same tests that we executed during the course (e.g. test if the "happy case" returns 200 or 201 status code, or it returns 404 Not found when we are requesting a non-existing ID).

To run the tests, perform the following steps:

1. Start the server. This can usually be done by running `npm run dev` in the folder you want to test.
2. Go to `postman/environments` folder in the repo. It has a content like this:

```json
{
  "id": "f1936dc5-a5da-47d7-8189-045437f96e9e",
  "name": "Local",
  "values": [
    {
      "key": "baseUrl",
      "value": "http://0.0.0.0:3000",
      "type": "default",
      "enabled": true
    }
  ],
  "_postman_variable_scope": "environment",
  "_postman_exported_at": "2023-08-11T05:55:13.469Z",
  "_postman_exported_using": "Postman/10.16.9"
}
```

3. If your server is running on a different port or URL, change the value `http://0.0.0.0:3000` to your server's data (this is the default one though).
4. Run the following command

```plaintext
npm test
```

After this, you will see the test results prompted to the terminal. If you have a look at the `package.json` file, you will see that it executes the collection stored in the `postman` folder of the repo root.

Important: When dealing with JSON data, please, make sure that you restart the server with `npm run dev` every time you execute tests! This is important because some tests will remove data via DELETE endpoints and that operation cannot be repeated with the same ID again and again.

## Description

This project's aim is to design and develop a RESTful API for an online booking app using Express.js and Prisma. Focusing on key aspects such as route handling, middleware for tasks like logging and authentication, as well as error handling.

The models are built using Prisma and the data is read, modified, and deleted through the Prisma client as well (in the services).

### Technologies used in this project

<img align="left" alt="JavaScript" width="24px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<img align="left" alt="Node.js" width="24px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img align="left" alt="Express.js" width="24px" src="https://raw.githubusercontent.com/github/explore/main/topics/express/express.png" />
<img align="left" alt="Supabase" width="24px" src="https://raw.githubusercontent.com/github/explore/main/topics/supabase/supabase.png" />
<a href="https://prisma.io">
  <img width="122" height="24" src="http://made-with.prisma.io/indigo.svg" alt="Made with Prisma" />
</a>
<img align="left" alt="PostgreSQL" width="24px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png" />
<img align="left" alt="Git" width="24px" src="https://raw.githubusercontent.com/github/explore/main/topics/git/git.png" />
<br/> <br/>

## User Stories

The app allows users to:

- Login

- Create, view, update, and delete users

- Create, view, update, and delete hosts

- Create, view, update, and delete properties

- Create, view, update, and delete amenities

- Create, view, update, and delete bookings

- Create, view, update, and delete reviews

## DB Diagram

[Diagrams](https://dbdiagram.io/d/DB-diagram-booking_api-66bb60498b4bb5230effab5a)
