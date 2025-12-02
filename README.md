# samzyh diets – MERN app

This repo contains the **samzyh diets** project: a MERN-stack web app that suggests Indian-focused diet and workout plans for different goals (weight gain/loss, fat loss, bodybuilding, mens physique, bulking, cutting), with three budget tiers (low / medium / high).

## Structure

- `backend/` – Node.js + Express API with MongoDB (Mongoose)
  - Admin auth with JWT
  - CRUD for diet plans and workout plans
  - Image upload endpoint
  - `/api/recommendations` that returns 3 plans (low/medium/high budget) based on user inputs
- `frontend/` – React + Vite + Material UI
  - Public questionnaire and recommendations
  - Plan listing and detail pages
  - Admin login, dashboard, and forms

## Running locally

### 1. Backend

1. Go to `backend`:

   ```bash
   cd backend
   ```

2. Create a `.env` file (do **not** commit it) with at least:

   ```bash
   MONGO_URI=mongodb://127.0.0.1:27017/samzyh_diets
   JWT_SECRET=your_jwt_secret_here
   ADMIN_EMAIL=admin@samzyh.local
   ADMIN_PASSWORD=samzyh123
   ```

3. Install and run:

   ```bash
   npm install
   npm run seed:admin
   npm run seed:diets
   npm run dev
   ```

### 2. Frontend

1. Go to `frontend`:

   ```bash
   cd frontend
   ```

2. Create a `.env` file with the API base URL:

   ```bash
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

The app will be available on the port shown by Vite (usually `http://localhost:5173`).

## Vercel deployment (frontend)

When connecting this repo to Vercel:

- **Project root**: point Vercel to the `frontend` folder.
- **Framework preset**: React.
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Env variable**: set `VITE_API_BASE_URL` to your deployed backend API URL.

You can deploy the backend separately on a Node-friendly host (Render, Railway, etc.) using the `backend` folder and the same environment variables as above.


