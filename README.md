# Workspace Reservation System SPA


## Description
A simple single-page application for managing workspace reservations. It uses a mock backend with `json-server` and a frontend SPA structure to simulate user authentication, reservation creation, approval, and management workflows.

## Technologies used
- JavaScript
- HTML
- CSS
- json-server
- REST API simulation

## Installation
1. Clone the repository.
2. Run `npm install` if `package.json` exists.
3. Ensure `db.json` is present in the project root.

## Running the project
- Start the frontend with the available script, for example:
  - `npm start`
  - or `npm run dev`
- If no frontend script is available, open the app directly in the browser and ensure the mock API is running.

## Running json-server
Run the mock backend with:
```bash
npx json-server --watch db.json --port 3001
```
This exposes endpoints such as:
- `GET /users`
- `GET /reservations`
- `POST /reservations`
- `PUT /reservations/:id`
- `PATCH /reservations/:id`
- `DELETE /reservations/:id`

## Test users
- admin@test.com / A123456 — role: admin
- user@test.com / A123456 — role: user
- user2@test.com / A123456 — role: user

## Project structure
- `db.json` — mock database with users and reservations.
- `README.md` — project documentation.
- `src/main.js` — entry point for the frontend application.
- `src/router/router.js` — client-side router and navigation.
- `src/views/` — view templates for pages.
- `src/controllers/` — business logic and event handling.
- `src/components/` — reusable UI components.
- `src/services/` — API communication services.
- `src/api/http.js` — HTTP request helper.
- `.gitignore` — files and folders excluded from version control.

## Role permissions
- `admin`: view all reservations, approve or reject requests, edit or delete any reservation, create reservations as an administrator.
- `user`: create reservations, view only personal reservations, edit or cancel pending bookings.

## Technical decisions
- `json-server` is used to simulate a REST API without a real backend.
- Frontend logic is separated into views, controllers, services, and components for easier maintenance.
- Data is stored in `db.json` so the application can run locally with minimal setup.
- The SPA uses client-side routing and session storage to manage authentication state.

## Author 

> Luigui Garizado
