# Setup Instructions - PrimeTrade AI

This guide will help you set up and run the PrimeTrade AI Task Management Dashboard on your local machine.

## Technology Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js

## Installation Steps

### 1. Clone or Download the Project

If you haven't already, get the project files on your machine.

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# On Windows (PowerShell)
New-Item .env

# On Mac/Linux
touch .env
```

Add the following configuration to `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

**Important Notes:**
- If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string
- Change `JWT_SECRET` to a random, secure string for production
- The `CORS_ORIGIN` should match your frontend URL

#### Start MongoDB (if running locally)

**Windows:**
```bash
# If MongoDB is installed as a service, it should already be running
# Otherwise, start it manually:
mongod
```

**Mac (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

#### Run the Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### 3. Frontend Setup

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

#### Install Dependencies

```bash
npm install
```

This will install:
- React and React DOM
- Vite
- React Router
- Zustand
- Axios
- Tailwind CSS
- And other dependencies

#### Configure Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
# On Windows (PowerShell)
New-Item .env.local

# On Mac/Linux
touch .env.local
```

Add the following:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** Vite uses `VITE_` prefix for environment variables (not `REACT_APP_` or `NEXT_PUBLIC_`)

#### Run the Frontend Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

The browser should automatically open to `http://localhost:3000`

## Using the Application

### 1. Create an Account

1. Navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Click "Sign up" 
4. Fill in:
   - Full Name
   - Email address
   - Password (minimum 6 characters)
5. Click "Sign Up"

### 2. Access the Dashboard

After signing up, you'll be automatically logged in and redirected to the dashboard where you can:

- View your task statistics
- See all your tasks in a table
- Create new tasks
- View task details
- Edit tasks
- Mark tasks as complete/pending
- Delete tasks

### 3. Manage Tasks

**Create a Task:**
1. Click "+ New Task" button
2. Enter title and description
3. Click "Create Task"

**View/Edit a Task:**
1. Click "View" on any task in the table
2. See full task details
3. Click "Edit" to modify
4. Click "Mark as Complete" to change status
5. Click "Delete" to remove

**Logout:**
- Click the "Logout" button in the top-right corner

## Available Scripts

### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend

```bash
# Start with nodemon (auto-restart)
npm run dev

# Start normally
npm start
```

## Project Structure Overview

```
frontend/
├── src/
│   ├── pages/          # Page components (Login, Dashboard, etc.)
│   ├── layouts/        # Layout wrappers (DashboardLayout)
│   ├── components/     # Reusable UI components
│   ├── services/       # API service layer
│   ├── store/          # Zustand state stores
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json

backend/
├── models/             # Mongoose schemas
├── controllers/        # Route handlers
├── routes/             # API routes
├── middleware/         # Custom middleware
├── config/             # Configuration files
├── utils/              # Utility functions
├── server.js           # Express server
└── package.json
```

## Troubleshooting

### Port Already in Use

**Frontend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Backend (Port 5000):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error

1. **Check if MongoDB is running:**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services list
   
   # Linux
   sudo systemctl status mongod
   ```

2. **Verify connection string in `.env`**

3. **For MongoDB Atlas:**
   - Ensure IP address is whitelisted
   - Check username/password are correct
   - Verify network access settings

### CORS Errors

1. Verify `CORS_ORIGIN` in backend `.env` matches frontend URL
2. Ensure both servers are running
3. Check browser console for specific error messages

### Environment Variables Not Loading

1. **Frontend:** Ensure file is named `.env.local` (not `.env`)
2. **Frontend:** Variables must start with `VITE_`
3. **Restart dev server** after changing environment variables
4. Clear browser cache if needed

### Module Not Found Errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or on Windows
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Build Errors

1. Check Node.js version: `node --version` (should be 16+)
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Ensure all dependencies are installed

## Development Tips

### Hot Module Replacement (HMR)

Vite provides instant HMR - your changes will reflect immediately without full page reload.

### API Requests

All API requests go through `src/services/apiClient.js` which:
- Automatically adds JWT token to requests
- Handles 401 errors (auto-logout)
- Provides consistent error handling

### State Management

- **Auth state:** `src/store/authStore.js`
- **Task state:** `src/store/taskStore.js`

Access anywhere with:
```javascript
import useAuthStore from '../store/authStore';
const user = useAuthStore((state) => state.user);
```

### Protected Routes

The `DashboardLayout` component automatically:
- Checks for authentication
- Redirects to login if not authenticated
- Loads user profile on mount

## Production Deployment

### Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/dist/`

Deploy the `dist` folder to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

**Important:** Update `VITE_API_URL` to your production API URL

### Backend

```bash
cd backend
npm start
```

Deploy to:
- Heroku
- Railway
- DigitalOcean
- AWS
- Any Node.js hosting service

**Important:** 
- Set all environment variables on your hosting platform
- Use a production MongoDB database (MongoDB Atlas recommended)
- Change `JWT_SECRET` to a secure random string

## Support

If you encounter any issues:

1. Check this troubleshooting guide
2. Verify all environment variables are set correctly
3. Ensure both frontend and backend servers are running
4. Check browser console and terminal for error messages
5. Verify MongoDB is running and accessible

## Next Steps

Once everything is running:

1. Explore the codebase
2. Customize the UI/styling
3. Add new features
4. Deploy to production

Happy coding! 🚀

