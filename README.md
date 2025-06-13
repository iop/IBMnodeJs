# Book Review API (DEMO Project)

This is a Node.js + Express.js RESTful API for managing book reviews. 
It was built as the final project for the Node.js & Express course. 
The application allows users to register, log in, and manage book reviews.

## Features

- ✅ Retrieve list of all books
- ✅ Search by ISBN, Author, or Title
- ✅ Get book reviews
- ✅ Register and login users with JWT + Session authentication
- ✅ Add/Update/Delete reviews (authorized users only)
- ✅ Async/Await and Promise support for multiple users
- ✅ Includes 4 client-side scripts using Axios (`task10`–`task13`)

## Folder Structure

```
project-root/
├── client/               # Axios-based Node.js scripts for tasks 10–13
├── data/                 # Initial users and books data
├── router/               # Express routes (books.js, users.js)
├── screenshots/          # Contains screenshots of all completed tasks
├── index.js              # Main server entry point
├── package.json          # Project configuration and scripts
```

## Prerequisites

- Node.js v18 or compatible
- npm

## Installation

```bash
npm install
```

## Run Server

```bash
npm start
```

Server will run on: `http://localhost:3002`

## API Endpoints

| Method | Route                          | Description                          |
|--------|--------------------------------|--------------------------------------|
| GET    | /books                         | Get all books                        |
| GET    | /books/isbn/:isbn              | Search book by ISBN                  |
| GET    | /books/author/:author          | Search books by author               |
| GET    | /books/title/:title            | Search books by title                |
| GET    | /books/review/:isbn            | Get reviews for a book               |
| POST   | /users/register                | Register new user                    |
| POST   | /users/login                   | Login and get access token           |
| PUT    | /books/review/:isbn            | Add/update review (auth required)    |
| DELETE | /books/review/:isbn            | Delete review (auth required)        |

## Run Axios Scripts (Tasks 10–13)

Each script is located in the `client/` folder.

```bash
npm run task10    # Get all books (callback)
npm run task11    # Search by ISBN (Promise)
npm run task12    # Search by Author (Async/Await)
npm run task13    # Search by Title (Async/Await)
```

> 🔒 Note: These scripts do not require authentication.

## Screenshots

See the `screenshots/` folder for required proof of completed tasks (1–14), as outlined in the course.