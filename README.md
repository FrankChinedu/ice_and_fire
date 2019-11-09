# Ice and Fire

##### A Books API.

## Prerequisites

Kindly ensure you install the following softwares

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/en/)
3. Node Package Manager (npm), this comes pre-installed with Node.js
4. install mongoDB for the database

## Getting Started

In order to get a copy of the project up and running on your local computer for development and testing purposes.
Do the following

1. Clone the repo.
2. Switch to project directory
3. Create a local `.env` file using the `sample.env` file on the root folder or by typing `cp sample.env .env` on the command line set env variables.
4. Type `npm install` to install dependencies
5. Type `npm run dev:start` to start development server or `npm start` to run in production
6. To test app run `npm run test` or `npm t`

## Routes (api - end points)

- GET  localhost:PORT/api/external-books?name=`a game of thrones` - get external book
- POST  localhost:PORT/api/v1/books - create a book
- GET  localhost:PORT/api/v1/books - get all books
- GET  localhost:PORT/api/v1/books/:id - get a book by its ID
- PATCH  localhost:PORT/api/v1/books/:id - update a book passing update parameters
- DELETE  localhost:PORT/api/v1/books/:id - delete a book. 
