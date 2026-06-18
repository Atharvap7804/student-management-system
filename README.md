# Student Management System

A full-stack student management application with a Node.js/Express backend and a React + Vite frontend.

## Project structure

- `server.js` - backend server entry point
- `src/` - backend source code
  - `app.js` - Express application setup
  - `controllers/students.controller.js` - student route handlers
  - `db/db.js` - PostgreSQL database connection
  - `routes/students.routes.js` - student API routes
  - `config/upload.config.js` - multer file upload configuration
- `frontend/` - React frontend built with Vite
  - `src/App.jsx` - main frontend application
  - `src/components/` - reusable UI components
  - `public/` - static assets

## Features

- add and edit student records
- delete student records
- search and filter students by name and course
- paginated student list
- file upload support for student photos
- route-based frontend behavior for list and form pages

## Tech stack

- Backend: Node.js, Express, PostgreSQL, multer, cors, dotenv
- Frontend: React, Vite, Tailwind CSS, React Router, Axios, lucide-react

## Prerequisites

- Node.js
- PostgreSQL
- Yarn or npm

## Backend setup

1. Install backend dependencies

```bash
cd student-management-system
npm install
```

2. Create a `.env` file in the root if needed and configure your database connection and upload settings.

3. Run the backend server

```bash
npm run dev
```

The backend is expected to run on `http://localhost:5000`.

## Frontend setup

1. Install frontend dependencies

```bash
cd frontend
npm install
```

2. Run the frontend development server

```bash
npm run dev
```

3. Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Available scripts

- `npm run dev` (root) - starts the backend server with nodemon
- `npm run dev` (frontend) - starts the Vite development server
- `npm run build` (frontend) - builds the frontend for production
- `npm run preview` (frontend) - previews the built frontend
- `npm run lint` (frontend) - lints frontend files

## API Endpoints

Base URL: `http://localhost:5000`

- `GET /students`
  - Returns paginated student records.
  - Query parameters:
    - `search` — search by name, course, or admission ID
    - `course` — filter by course
    - `page` — page number
    - `limit` — number of records per page

- `GET /students/:id`
  - Returns a single student by admission number.

- `POST /students`
  - Creates a new student record.
  - Request type: `multipart/form-data`
  - Fields: `name`, `course`, `year`, `date_of_birth`, `email`, `mobile_number`, `gender`, `address`, `photo`

- `PUT /students/:id`
  - Updates an existing student record.
  - Request type: `multipart/form-data`
  - Fields: `name`, `course`, `year`, `date_of_birth`, `email`, `mobile_number`, `gender`, `address`, `photo` (optional)

- `DELETE /students/:id`
  - Deletes a student record by admission number.

## Notes

- The backend uses `uploads/` to store uploaded student photos.
- The frontend uses route-based styling so `/` supports hidden scrollbar scrolling and `/add-student` is fixed.
- Update the API base URL in `frontend/src/App.jsx` if your backend runs on a different host or port.
