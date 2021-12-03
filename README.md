# Coding Challenge - Phone Catalog

## Structure and technologies

The problem is divided in two different workspaces.

- _Rest API_: It's the backend endpoints to call from the web app. It is programmed with Node.js helped with _Express_. There are four endpoints: get all phones, create new phone, edit a phone and to remove a phone. Firestore database is used to store all this information plus the images on the storage.
- _React APP_: It's the frontend code where you can see the result of the web app. The programming languages used are React and CSS.

## Install & Run

### Prerequisites

To run this program you'll need to install _Node_, _Docker_ (optional) and clone this repo locally.

### Install dependencies

To install dependencies, both server and client, execute this command on root folder:

```bash
yarn install
```

### Run _Rest API_

To run the API, you'll have to go the folder /api and execute:

```bash
npm start
```

### Run _React APP_

To run the APP, you'll have to go the folder /app and execute:

```bash
npm start
```

It will run api and app in:

- APP: http://localhost:3000
- API: http://localhost:8080

## Using Docker

### Run app

From docker, you can run complete executing it:

```bash
docker-compose up
```

It will run both, api and app, in:

- APP: http://localhost:3000
- API: http://localhost:8080
