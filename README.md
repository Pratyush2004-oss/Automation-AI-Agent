# Automate AI

Automate AI is a full-stack application foundation for signing in with Google,
managing authenticated users, and building an AI-agent workspace. The project
currently contains the authentication flow, protected dashboard shell, user
session handling, and reusable frontend UI components.

## Project structure

```text
.
├── backend/   Express API, Firebase Admin authentication, MongoDB persistence
└── frontend/  React, TypeScript, Vite, Tailwind CSS application
```

## Implemented functionality

### Frontend

- React 19 application built with Vite and TypeScript.
- Google sign-in using Firebase Authentication and `GoogleAuthProvider`.
- Firebase ID token retrieval after a successful Google sign-in.
- Login API integration using Axios with credentialed requests.
- TanStack React Query hooks for:
  - Login
  - Current-user/session checks
  - Logout
- Redux Toolkit user state:
  - Store the authenticated user.
  - Clear the user during logout.
  - Typed Redux selector and dispatch hooks.
- Authentication-aware routing with React Router:
  - Public home route.
  - Login route.
  - Protected dashboard route.
  - Redirect authenticated users away from login.
  - Redirect unauthenticated users to login.
  - Fallback `404` route.
- Dashboard shell with:
  - Automate AI branding.
  - User profile avatar and fallback initials.
  - User name and email display.
  - Profile dropdown.
  - Logout action.
  - Navigation dropdown for agents and integrations.
- Toast notifications for successful and failed authentication operations.
- Shared UI components based on Tailwind CSS and shadcn-style primitives,
  including buttons, cards, fields, labels, inputs, avatars, dropdown menus,
  separators, and toast support.
- Responsive dark glassmorphism-inspired login and dashboard styling.
- Vite path alias support using `@` for the frontend source directory.

### Backend

- Express server with JSON and URL-encoded request parsing.
- CORS configured for the local frontend with credentials enabled.
- Cookie parsing for HTTP-only authentication cookies.
- MongoDB connection through Mongoose.
- Firebase Admin SDK initialization using a service account.
- Public login endpoint:
  - Accepts a Firebase ID token.
  - Verifies the token with Firebase Admin.
  - Creates or updates the corresponding MongoDB user.
  - Generates a seven-day JWT.
  - Stores the JWT in an HTTP-only cookie.
- Protected current-user endpoint:
  - Reads the JWT cookie.
  - Resolves the user from MongoDB.
  - Attaches the user to the request.
- Logout endpoint that clears the authentication cookie.
- JWT-based authentication middleware.
- Mongoose user model with:
  - Firebase UID
  - Name
  - Email
  - Profile picture
  - Automatic `createdAt` and `updatedAt` timestamps
- Centralized Express error response middleware.
- Development workflow using Nodemon.

## API endpoints

The backend runs under the `/api/v1` prefix.

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/login` | Public | Verify Firebase token, upsert user, and issue JWT cookie |
| `GET` | `/api/v1/auth/me` | Protected | Return the authenticated MongoDB user |
| `GET` | `/api/v1/auth/logout` | Public | Clear the JWT cookie |

## Prerequisites

- Node.js and npm
- MongoDB database
- Firebase project with Google sign-in enabled
- Firebase service account credentials for the backend

## Local setup

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure the backend

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
```

Place the Firebase Admin SDK service-account file at:

```text
backend/serviceAccountKey.json
```

This file contains private credentials and must never be committed or shared.

### 3. Configure the frontend

Create `frontend/.env.local`:

```env
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_SERVER_URL=http://localhost:5000/api/v1/
```

Enable Google as a sign-in provider in the Firebase console.

### 4. Start the application

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

The frontend is served by Vite, normally at
`http://localhost:5173`. The backend listens on port `5000` unless `PORT` is
configured differently.

## Frontend commands

Run these commands from `frontend/`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Type-check and create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

## Backend commands

Run these commands from `backend/`:

```bash
npm run dev      # Start the API with Nodemon
npm test         # Placeholder script; no backend test suite is configured yet
```

## Current scope and next areas

The dashboard currently provides the authenticated application shell and
navigation links for future agent and integration features. The following
areas are represented in navigation but do not yet have implemented pages or
backend APIs:

- Agent listing (`/dashboard/agents`)
- Agent creation (`/dashboard/agents/new`)
- Integrations (`/dashboard/integrations`)
- AI-agent creation, execution, and management
- Automated frontend and backend test suites

## Security notes

- Keep `backend/.env`, `frontend/.env.local`, and
  `backend/serviceAccountKey.json` out of source control.
- Use a strong, private JWT secret.
- Use HTTPS and secure cookies when deploying outside local development.
- Restrict Firebase authorized domains and production CORS origins before
  deployment.
