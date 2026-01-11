# PrimeTrade AI - Task Management Dashboard

A modern, full-stack web application featuring authentication and a comprehensive task management dashboard built with React.js (Vite) and Node.js/Express.

## Features

### Frontend
✅ **Authentication**
- User signup and login with JWT
- Protected routes with automatic redirects
- Secure token storage and management
- Logout with token cleanup

✅ **User Interface**
- Fully responsive design (mobile, tablet, desktop)
- Clean, modern component-based architecture
- Accessible forms with error handling
- Loading and empty states

✅ **Dashboard**
- User profile display
- Task overview with statistics
- CRUD operations for tasks
- Search and filter capabilities
- Task completion status tracking

✅ **Best Practices**
- Vite for fast development and optimized builds
- React Router for client-side routing
- React Context API for state management
- Axios with interceptors for API calls
- Custom hooks for reusable logic
- Client-side form validation
- Environment-based configuration

### Backend
✅ **API Endpoints**
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Fetch user profile
- GET `/api/tasks` - List user tasks
- POST `/api/tasks` - Create new task
- GET `/api/tasks/:id` - Get task details
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

✅ **Security**
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- CORS configuration

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage.jsx     # Landing page (redirect)
│   │   │   ├── LoginPage.jsx    # Login page
│   │   │   ├── SignupPage.jsx   # Signup page
│   │   │   ├── DashboardPage.jsx # Dashboard home
│   │   │   ├── NewTaskPage.jsx  # Create task
│   │   │   └── TaskDetailPage.jsx # Task detail
│   │   ├── layouts/             # Layout components
│   │   │   └── DashboardLayout.jsx # Dashboard layout
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── TextArea.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── Header.jsx
│   │   ├── contexts/            # React Context providers
│   │   │   ├── AuthContext.jsx  # Auth state
│   │   │   └── TaskContext.jsx  # Task state
│   │   ├── services/            # API services
│   │   │   ├── apiClient.js     # Axios config
│   │   │   └── apiService.js    # API methods
│   │   ├── hooks/               # Custom hooks
│   │   │   ├── useProtectedRoute.js
│   │   │   └── useFormValidation.js
│   │   ├── utils/               # Utility functions
│   │   │   └── helpers.js
│   │   ├── App.jsx              # Main App component with routes
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/                  # Static assets
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   └── package.json
│
└── backend/
    ├── models/                  # Mongoose schemas
    │   ├── User.js
    │   └── Task.js
    ├── controllers/             # Request handlers
    │   ├── authController.js
    │   └── taskController.js
    ├── routes/                  # API routes
    │   ├── auth.js
    │   └── tasks.js
    ├── middleware/              # Express middleware
    │   └── auth.js
    ├── config/                  # Configuration
    │   └── database.js
    ├── utils/                   # Utility functions
    │   └── jwt.js
    └── server.js                # Express server
```

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and setup frontend:**
```bash
cd frontend
npm install
```

2. **Clone and setup backend:**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration:
# - MONGODB_URI (local MongoDB or Atlas connection string)
# - JWT_SECRET (any secure string)
# - CORS_ORIGIN (http://localhost:3000 for development)
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### Testing the App

1. Open http://localhost:3000
2. Click "Sign Up" and create a new account
3. Fill in name, email, and password (min 6 characters)
4. After signup, you'll be redirected to the dashboard
5. Create, view, edit, and delete tasks
6. Mark tasks as complete/pending
7. Use logout to exit

## Configuration

### Frontend Environment Variables
Create `frontend/.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

### Backend Environment Variables
Create `backend/.env`:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

## API Documentation

### Authentication Endpoints

**POST /api/auth/signup**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**POST /api/auth/login**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Task Endpoints

All task endpoints require `Authorization: Bearer <token>` header.

**GET /api/tasks**
- Query params: `search` (optional) - search in title and description

**POST /api/tasks**
```json
{
  "title": "Task Title",
  "description": "Task Description"
}
```

**GET /api/tasks/:id**

**PUT /api/tasks/:id**
```json
{
  "title": "Updated Title",
  "description": "Updated Description",
  "completed": true
}
```

**DELETE /api/tasks/:id**

## Key Features Explained

### JWT Authentication
- Tokens are generated on signup/login and stored in localStorage
- Axios interceptor automatically adds token to all API requests
- 401 errors trigger automatic logout and redirect to login

### State Management
- React Context API for auth and task state
- Persistent token storage with localStorage
- Built-in React solution - no external dependencies
- Simple and efficient state management

### Routing
- React Router v6 for client-side routing
- Protected routes with authentication checks
- Nested routes for dashboard layout

### Form Validation
- Custom `useFormValidation` hook for reusable validation logic
- Email, password, and required field validation
- Touch state tracking for better UX
- Backend validation error display

### Responsive Design
- Tailwind CSS for styling
- Mobile-first approach
- Grid layouts for responsive tables and cards
- Flexible component system

## Error Handling

- Client-side validation with immediate feedback
- Backend validation error messages displayed to user
- Graceful error states with retry options
- Loading states during async operations

## Security Considerations

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with expiration
- Protected routes require valid token
- CORS configured for development
- Environment variables for sensitive data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task priorities
- [ ] User profile settings
- [ ] Email notifications
- [ ] Dark mode
- [ ] Export tasks
- [ ] Collaborative task sharing

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- For Atlas, ensure IP whitelist includes your machine

### CORS Errors
- Verify CORS_ORIGIN in backend .env
- Ensure frontend and backend are running on correct ports

### Token Errors
- Clear localStorage and try logging in again
- Check JWT_SECRET matches between sessions
- Verify token expiration time

## License

MIT License - feel free to use this project for learning and development.
