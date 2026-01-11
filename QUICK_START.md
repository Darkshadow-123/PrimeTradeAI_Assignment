# Quick Start Guide

Get the PrimeTrade AI Task Management Dashboard running in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- MongoDB running (locally or Atlas)

## Setup Steps

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with this content:
# PORT=5000
# NODE_ENV=development
# MONGODB_URI=mongodb://localhost:27017/primetrade
# JWT_SECRET=your_secret_key_here
# JWT_EXPIRE=7d
# CORS_ORIGIN=http://localhost:3000

# Start the server
npm run dev
```

Expected output: `Server running on port 5000` and `MongoDB connected successfully`

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file with this content:
# VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

Expected output: `Local: http://localhost:3000/`

### 3. Open Your Browser

Navigate to `http://localhost:3000`

### 4. Create an Account

1. Click "Sign up"
2. Enter your name, email, and password
3. Click "Sign Up"
4. You'll be redirected to the dashboard

### 5. Start Managing Tasks!

- Click "+ New Task" to create tasks
- Click "View" to see task details
- Edit, complete, or delete tasks as needed

## What Changed from Next.js?

This project has been converted from Next.js to a standard React + Vite setup:

### Key Changes:

1. **Build Tool**: Next.js → Vite
2. **Routing**: Next.js App Router → React Router v6
3. **File Structure**: `app/` directory → `src/pages/` and `src/layouts/`
4. **Environment Variables**: `NEXT_PUBLIC_*` → `VITE_*`
5. **No Server-Side Rendering**: Pure client-side React app

### Benefits:

- ⚡ **Faster Development**: Vite's HMR is lightning fast
- 🎯 **Simpler**: No server-side rendering complexity
- 📦 **Smaller Bundle**: Optimized production builds
- 🔧 **More Control**: Standard React patterns
- 🚀 **Easy Deployment**: Deploy anywhere that hosts static files

### File Structure:

```
frontend/
├── src/
│   ├── pages/              # Page components (LoginPage, DashboardPage, etc.)
│   ├── layouts/            # Layout wrappers (DashboardLayout)
│   ├── components/         # Reusable components (Button, Card, etc.)
│   ├── services/           # API calls (apiClient, apiService)
│   ├── store/              # Zustand stores (authStore, taskStore)
│   ├── hooks/              # Custom hooks (useFormValidation, etc.)
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Main app with React Router
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json
```

## Troubleshooting

**MongoDB not connecting?**
- Ensure MongoDB is running: `mongod` (or check if service is running)
- Verify `MONGODB_URI` in backend `.env`

**Port already in use?**
- Frontend: Change port in `vite.config.js`
- Backend: Change `PORT` in backend `.env`

**Environment variables not working?**
- Restart the dev server after changing `.env` files
- Frontend: Ensure variables start with `VITE_`
- Backend: Ensure `.env` file exists in `backend/` directory

**CORS errors?**
- Verify `CORS_ORIGIN` in backend `.env` matches frontend URL
- Ensure both servers are running

## Need More Help?

See `SETUP_INSTRUCTIONS.md` for detailed setup and troubleshooting guide.

---

Enjoy building with React + Vite! 🎉

