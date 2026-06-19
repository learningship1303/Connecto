# Connecto

Connecto is a full-stack real-time chat application by Adhya Singh.

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, Tailwind CSS, DaisyUI, Socket.IO Client
- Backend: Node.js, Express, Socket.IO, MongoDB, Mongoose, JWT, bcryptjs

## Environment Setup

Copy `.env.example` to `.env` in the project root and add your own credentials:

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
JWT_SECRET_KEY=replace-this-with-a-strong-random-secret
CLIENT_URL=http://localhost:5173
```

Required manual updates:

- `MONGO_URI`: your MongoDB Atlas or MongoDB connection string.
- `JWT_SECRET_KEY`: a strong random secret. Generate one with `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`.
- `CLIENT_URL`: frontend URL allowed by CORS. Use `http://localhost:5173` locally.
- `VITE_API_BASE_URL`: frontend backend URL. Create `frontend/.env` from `frontend/.env.example` if you need a value other than `http://localhost:8080`.

## Backend Setup

From the project root:

```bash
npm install
npm run dev
```

The backend runs on `http://localhost:8080` when `PORT=8080`.

## Frontend Setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Production Build

From the project root:

```bash
npm run build
npm start
```

`npm run build` installs root and frontend dependencies and builds the Vite frontend into `frontend/dist`.
